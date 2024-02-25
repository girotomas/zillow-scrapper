export interface ZillowSearchResults {
  user: {
    isLoggedIn: boolean;
    hasHousingConnectorPermission: boolean;
    savedHomesCount: number;
    personalizedSearchTraceID: string;
    guid: string;
    zuid: string;
    isBot: boolean;
    email: string;
    displayName: string;
  };
  mapState: {
    customRegionPolygonWkt: string | null;
    schoolPolygonWkt: string | null;
    isCurrentLocationSearch: boolean;
    userPosition: {
      lat: number | null;
      lon: number | null;
    };
  };
  regionState: {
    regionInfo: {
      regionId: number;
      regionType: number;
      regionName: string;
      displayName: string;
      isPointRegion: boolean;
    }[];
    regionBounds: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  };
  searchPageSeoObject: {
    baseUrl: string;
    windowTitle: string;
    metaDescription: string;
  };
  requestId: number;
  cat1: {
    searchResults: {
      listResults: [];
      mapResults: ZillowHouseResult[];
      resultsHash: string;
      homeRecCount: number;
      showForYouCount: number;
    };
    searchList: {
      expansionDistance: number;
      staticBaseUrl: string | null;
      zeroResultsFilters: any | null;
      pagination: any | null;
      adsConfig: {
        navAdSlot: string;
        displayAdSlot: string;
        targets: {
          guid: string;
          vers: string;
          premieragent: string;
          state: string;
          dma: string;
          cnty: string;
          city: string;
          zip: string;
          mlat: string;
          mlong: string;
          listtp: string;
          searchtp: string;
        };
        needsUpdate: boolean;
      };
      totalResultCount: number;
      resultsPerPage: number;
      totalPages: number;
      limitSearchResultsCount: number | null;
      displayResultsCount: number;
      listResultsTitle: string;
      resultContexts: any | null;
      pageRules: string;
      shareConfig: {
        captchaKey: string;
        csrfToken: string;
      };
    };
  };
  categoryTotals: {
    cat1: { totalResultCount: number };
    cat2: { totalResultCount: number };
  };
}

export interface ZillowHouseResult {
  zpid: number;
  rawHomeStatusCd: string;
  marketingStatusSimplifiedCd: string;
  imgSrc: string;
  hasImage: boolean;
  detailUrl: string;
  statusType: string;
  statusText: string;
  price: string;
  priceLabel: string;
  address: string;
  lotAreaString: string;
  latLong: {
    latitude: number;
    longitude: number;
  };
  hdpData: {
    homeInfo: {
      zpid: number;
      streetAddress: string;
      zipcode: string;
      city: string;
      state: string;
      latitude: number;
      longitude: number;
      price: number;
      homeType: string;
      homeStatus: string;
      daysOnZillow: number;
      isFeatured: boolean;
      shouldHighlight: boolean;
      rentZestimate: number;
      listing_sub_type: { is_FSBA: boolean };
      isUnmappable: boolean;
      isPreforeclosureAuction: boolean;
      homeStatusForHDP: string;
      priceForHDP: number;
      timeOnZillow: number;
      isNonOwnerOccupied: boolean;
      isPremierBuilder: boolean;
      isZillowOwned: boolean;
      currency: string;
      country: string;
      lotAreaValue: number;
      lotAreaUnit: string;
      isShowcaseListing: boolean;
    };
  };
  isUserClaimingOwner: boolean;
  isUserConfirmedClaim: boolean;
  pgapt: string;
  sgapt: string;
  shouldShowZestimateAsPrice: boolean;
  has3DModel: boolean;
  hasVideo: boolean;
  isHomeRec: boolean;
  hasAdditionalAttributions: boolean;
  isFeaturedListing: boolean;
  isShowcaseListing: boolean;
  listingType: string;
  isFavorite: boolean;
  visited: boolean;
  info3String: string;
  brokerName: string;
  timeOnZillow: number;
}
