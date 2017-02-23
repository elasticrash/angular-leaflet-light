/**
 * Class LeafletCtrl
 * This is the controller of the leaflet directive
 */
class LeafletCtrl {
    /**
     * LeafletCtrl constructor
     * @constructor
     * @param {Object} $element angular $element
     * @param {Object} leafletService local service
     */
    constructor($element, $q, leafletService) {
        this.$element = $element;
        this.leafletService = leafletService;
    }
    $onInit() {
        this.mapid = this.$element.attr('id') || 'map';
        this.$element.removeAttr('id');
        var div = this.$element.find('div');
        div.attr('id', this.mapid);
        div.attr('id', this.mapid);
        div.attr('style', this.$element.attr('style'));
        div.attr('class', this.$element.attr('class'));
        this.container = div[0];

        this.leafletService.data[this.mapid].map = $q.defer();
        this.leafletService.data[this.mapid].promise = this.leafletService.data[this.mapid].map.promise;
    }
    $postLink() {
        if (!L.Icon.Default.imagePath && this.leafletService.settings.imagePath) {
            L.Icon.Default.imagePath = this.leafletService.settings.imagePath;
        }
        var map = L.map(this.container);
        this.leafletService.data[this.mapid].map.resolve(map);
        this.leafletService.updateMapFromSettings(map);
        this.onMapInitialized({ map: map });
        this.map = map;
    }
    $onChanges(changesObj) {
        if (changesObj.leafletShow.currentValue && this.map) {
            this.leafletService.fixHiddenLeaflet(this.map);
        }
    }

}

LeafletCtrl.$inject = ['$element', 'leafletService'];
export default LeafletCtrl;