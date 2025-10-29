import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';

// Fix Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [magnitudeFilter, setMagnitudeFilter] = useState(0);
  const [timeFilter, setTimeFilter] = useState('day');
  const [stats, setStats] = useState({ total: 0, avgMag: 0, maxMag: 0 });
  
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Initialize map
  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      const map = L.map(mapRef.current).setView([20, 0], 2);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18
      }).addTo(map);
      
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Fetch earthquake data
  useEffect(() => {
    fetchEarthquakes();
  }, [timeFilter]);

  // Update markers
  useEffect(() => {
    if (mapInstanceRef.current && earthquakes.length > 0) {
      updateMarkers();
    }
  }, [earthquakes, magnitudeFilter]);

  const fetchEarthquakes = async () => {
    setLoading(true);
    setError(null);
    
    const endpoints = {
      hour: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson',
      day: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
      week: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson',
      month: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
    };

    try {
      const response = await fetch(endpoints[timeFilter]);
      if (!response.ok) throw new Error('Failed to fetch data');
      
      const data = await response.json();
      const features = data.features || [];
      
      setEarthquakes(features);
      calculateStats(features);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    if (data.length === 0) {
      setStats({ total: 0, avgMag: 0, maxMag: 0 });
      return;
    }
    
    const magnitudes = data
      .map(eq => eq.properties.mag)
      .filter(mag => mag !== null && mag !== undefined);
    
    const total = magnitudes.length;
    const avgMag = total > 0 
      ? (magnitudes.reduce((a, b) => a + b, 0) / total).toFixed(2) 
      : '0.00';
    const maxMag = magnitudes.length > 0 
      ? Math.max(...magnitudes).toFixed(2) 
      : '0.00';
    
    setStats({ total, avgMag, maxMag });
  };

  const updateMarkers = () => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Filter by magnitude
    const filtered = earthquakes.filter(eq => 
      eq.properties.mag !== null && 
      eq.properties.mag !== undefined && 
      eq.properties.mag >= magnitudeFilter
    );

    // Add markers
    filtered.forEach((earthquake) => {
      const [lng, lat, depth] = earthquake.geometry.coordinates;
      const { mag, place, time } = earthquake.properties;

      if (!lat || !lng) return;

      const color = getMarkerColor(mag);
      const size = getMarkerSize(mag);

      const circle = L.circleMarker([lat, lng], {
        radius: size,
        fillColor: color,
        color: '#fff',
        weight: 1,
        opacity: 0.8,
        fillOpacity: 0.6
      });

      const popupContent = `
        <div class="text-gray-900 font-sans min-w-[200px]">
          <h3 class="font-bold text-lg mb-2">Magnitude ${mag}</h3>
          <p class="text-sm mb-1"><strong>Location:</strong> ${place}</p>
          <p class="text-sm mb-1"><strong>Time:</strong> ${new Date(time).toLocaleString()}</p>
          <p class="text-sm mb-1"><strong>Depth:</strong> ${depth ? depth.toFixed(1) : 'N/A'} km</p>
          <p class="text-sm"><strong>Coordinates:</strong> ${lat.toFixed(3)}°, ${lng.toFixed(3)}°</p>
        </div>
      `;

      circle.bindPopup(popupContent);
      circle.addTo(mapInstanceRef.current);
      markersRef.current.push(circle);
    });
  };

  const getMarkerColor = (magnitude) => {
    if (magnitude >= 6.0) return '#dc2626';
    if (magnitude >= 4.5) return '#f59e0b';
    if (magnitude >= 2.5) return '#fbbf24';
    return '#10b981';
  };

  const getMarkerSize = (magnitude) => {
    return Math.max(magnitude * 2, 4);
  };

  const filteredCount = earthquakes.filter(eq => 
    eq.properties.mag !== null && 
    eq.properties.mag !== undefined && 
    eq.properties.mag >= magnitudeFilter
  ).length;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <h1 className="text-3xl font-bold text-center">🌍 Global Earthquake Visualizer</h1>
        <p className="text-center text-gray-400 mt-1">Real-time seismic activity monitoring</p>
      </div>

      {/* Controls & Stats */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Time Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Time Range</label>
            <select 
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="hour">Last Hour</option>
              <option value="day">Last 24 Hours</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>

          {/* Magnitude Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Min Magnitude: {magnitudeFilter.toFixed(1)}
            </label>
            <input 
              type="range"
              min="0"
              max="7"
              step="0.5"
              value={magnitudeFilter}
              onChange={(e) => setMagnitudeFilter(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Stats */}
          <div className="bg-gray-700 rounded-lg p-3">
            <p className="text-xs text-gray-400">Total Events</p>
            <p className="text-2xl font-bold text-blue-400">{filteredCount}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-3">
            <p className="text-xs text-gray-400">Avg Magnitude</p>
            <p className="text-2xl font-bold text-green-400">{stats.avgMag}</p>
          </div>
        </div>

        {/* Legend */}
        <div className="max-w-7xl mx-auto mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span>&lt; 2.5 Minor</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
            <span>2.5 - 4.5 Light</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span>4.5 - 6.0 Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-600"></div>
            <span>6.0+ Strong</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[calc(100vh-280px)]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-[1000]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-lg">Loading earthquake data...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-[1000]">
            <div className="bg-red-900 border border-red-700 rounded-lg p-6 max-w-md">
              <h3 className="text-xl font-bold mb-2">Error Loading Data</h3>
              <p className="text-red-200">{error}</p>
              <button 
                onClick={fetchEarthquakes}
                className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <div 
          ref={mapRef} 
          className="w-full h-full bg-gray-800"
        />
      </div>

      {/* Footer */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-3 text-center text-sm text-gray-400">
        Data: USGS Earthquake Hazards Program | Built for Casey, Geography Student | 
        Showing {filteredCount} of {earthquakes.length} events
      </div>
    </div>
  );
}

export default App;

