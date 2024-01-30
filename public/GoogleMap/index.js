export default class GoogleMap {
  constructor(mapInstance) {
    this.map = null;
    this.mapInstance = mapInstance;
    this.infoWindow = null;
    this.markers = [];
    const that = this;

    console.log("window", window);

    const getNewMap = () => {
      async function createMap(mapInstance, success, error) {
        try {
          const { Map, InfoWindow } = await google.maps.importLibrary("maps");
          const { AdvancedMarkerElement, PinElement } =
            await google.maps.importLibrary("marker");

          console.log("mapInstance", mapInstance);

          that.map = new Map(mapInstance, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
            mapId: "JOMFINDCHURCH",
          });

          // async function makewindow(success) {
          //   const { InfoWindow } = await google.maps.importLibrary("maps");
          if (!that.infoWindow) {
            that.infoWindow = new InfoWindow();
          }
          // }
          // makewindow();
        } catch (e) {
          console.error(e);
        }
      }

      createMap(this.mapInstance, null, null);
    };
    getNewMap();
  }
  centerMap(latitude, longitude) {
    this.map &&
      this.map.setCenter({
        lat: latitude,
        lng: longitude,
      });
  }
  // openInfoWindow() {
  //   const that = this;
  //   async function makewindow(success) {
  //     const { InfoWindow } = await google.maps.importLibrary("marker");
  //     if (!that.infoWindow) {
  //       that.infoWindow = new InfoWindow();
  //     }
  //   }

  //   makewindow(() => {
  //     console.log("window is created, now you can do something to it");
  //   });

  //   // const infoWindow = new InfoWindow();
  // }
  buildMarkerContent(church) {
    console.log("document", document);
    const content = document.createElement("div");

    console.log("PROPERTY", church);

    content.classList.add("church");
    content.style.backgroundColor = "red";
    content.style.border = "1px solid black";
    content.innerHTML = `
        <div class="icon" >
        ${church?.Name}
        </div>
        <div class="details">
            <div class="price"> ${church?.Name}</div>
            <div class="address">${church?.Address?.City}</div>
            <div class="features">
            ${church?.address?.State}
            </div>
        </div>
        `;
    return content;
  }
  addMarker(latitude, longitude, data) {
    var myLatlng = new google.maps.LatLng(latitude, longitude);
    console.log("----- addMarker  data", data);

    // var marker = new google.maps.Marker({
    //   position: myLatlng,
    //   title: title || "CHURCH",
    //   // content: pinBackground.element,
    // });
    const that = this;
    console.log("data", data);
    const markerTItle = data.Name;
    const churchData = data;
    async function doit(map) {
      try {
        console.log("markerTItle, markerTItle", markerTItle);
        const { AdvancedMarkerElement, PinElement } =
          await google.maps.importLibrary("marker");

        const pinBackground = new PinElement({
          // background: "#007ec1",
          glyphColor: "#005484",
          background: "#007ec1",
          borderColor: "#007ec1",
          scale: 1.5,
        });
        console.log("churchData", churchData);
        const marker = new AdvancedMarkerElement({
          map,
          position: { lat: latitude, lng: longitude },
          content: pinBackground.element,
          // content: that.buildMarkerContent(churchData),
          title: markerTItle,
        });
        const evtLister = ({ domEvent, latLng }) => {
          const { target } = domEvent;
          // alert("" + marker.title);
          that.infoWindow.close();
          that.infoWindow.setContent(churchData);
          that.infoWindow.open(marker.map, marker);
          console.log("&***********8churchData", churchData);
          that.mapInstance.dispatchEvent(
            new CustomEvent("ICONCLICKED", { detail: churchData })
          );
          // infoWindow.close();
          // infoWindow.setContent(marker.title);
          // infoWindow.open(marker.map, marker);
        };
        marker.removeEventListener("click", evtLister, false);
        marker.addListener("click", evtLister, false);
      } catch (e) {
        console.log(e);
      }
    }
    doit(that.map);

    //  var marker = new google.maps.Marker({
    //   position: myLatlng,
    //   title: title || "CHURCH",
    //   // content: pinBackground.element,
    // });
    //this.markers.push(marker);
    // To add the marker to the map, call setMap();
    //marker.setMap(this.map);
  }
}
