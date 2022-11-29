// coordinates are in swiss CH1903+
interface TrailCoordinates {
    x: number;
    y: number;
    ttnBackendId: string;
  }
  
  enum TrailLocation {
    ADLISBERG_1,
    ANTENNENTRAIL_1,
    HOECKLER_NEW_3,
  }
  
  const trails: Record<TrailLocation, TrailCoordinates> = {
    [TrailLocation.ADLISBERG_1]: { x: 1400000, y: 1500000, ttnBackendId:"adlisberg-1"},
    [TrailLocation.ANTENNENTRAIL_1]: { x: 1400000, y: 1500000, ttnBackendId:"antennentrail-1"},
    [TrailLocation.HOECKLER_NEW_3]: { x: 1400000, y: 1500000, ttnBackendId:"hockler-new-3"},
  };
  
  const adliserg = TrailLocation.ADLISBERG_1;
  
  //Object.entries(trails).filter(x => x.toString());
  
  //console.log(trails[adliserg]);  // "Small"
  
  //how to filter by value of ttnBackend?