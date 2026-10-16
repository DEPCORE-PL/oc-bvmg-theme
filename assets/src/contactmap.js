import leaflet from 'leaflet';

export function initMap( ) {
	let mapContainer = document.querySelector('.map');

	if (mapContainer) {
		let map = L.map(mapContainer);
		let markers = [];

		let marker = L.icon({
		    iconUrl: '../../themes/depcore-theme/assets/images/icons/marker.png',
		    iconSize:     [45, 57], // size of the icon
		    iconAnchor:   [22, 57], // point of the icon which will correspond to marker's location
		    popupAnchor:  [25, 57] // point from which the popup should open relative to the iconAnchor
		});

		function loadMap(  ){
			let latlon = [50.658010,17.968800];
			map.setView(latlon, 16);
			L.marker(latlon, {icon: marker}).addTo(map);
		}

		loadMap();
	}
}
