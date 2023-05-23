import type {AxiosRequestConfig, OpenAPIClient, OperationResponse, Parameters,} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface BestHotelOffer {
            hotel: Hotel;
            minPrice: number;
            departureDate: string; // date
            returnDate: string; // date
            roomType?: string;
            mealType?: string;
            countAdults: number;
            countChildren: number;
            duration: number;
            countAvailableOffers: number;
        }
        export type GetBestHotelOffersResponse = BestHotelOffer[];
        export interface GetHotelOffersResponse {
            hotel: Hotel;
            items: Offer[];
        }
        export interface Hotel {
            id: number;
            name: string;
            stars: number;
        }
        export interface Offer {
            _id: string
            hotelid: number
            price: number;
            countAdults: number;
            countChildren: number;
            inboundDepartureAirport: string;
            inboundDepartureDatetime: string; // date
            inboundArrivalAirport: string;
            inboundArrivalDatetime: string; // datetime
            outboundDepartureAirport: string;
            outboundDepartureDatetime?: string; // date
            outboundArrivalAirport: string;
            outboundArrivalDatetime: string; // datetime
            mealType: string;
            oceanView: boolean;
            roomType: string;
            duration: number;
            isSaved: boolean
        }
    }
}
declare namespace Paths {
    namespace GetBestOffersByHotel {
        namespace Parameters {
            export type CountAdults = number;
            export type CountChildren = number;
            export type DepartureAirports = string[];
            export type Duration = number;
            export type EarliestDepartureDate = string; // date
            export type LatestReturnDate = string; // date
            export type RoomType = string;
            export type MealType = string;
            export type MaxPrice = number;
            export type OceanView = boolean
            export type pageSize = int;
            export type pageNumber = int;
        }
        export interface QueryParameters {
            earliestDepartureDate: Parameters.EarliestDepartureDate /* date */;
            latestReturnDate: Parameters.LatestReturnDate /* date */;
            duration: Parameters.Duration;
            countAdults: Parameters.CountAdults;
            countChildren: Parameters.CountChildren;
            departureAirports: Parameters.DepartureAirports;
            mealType: Parameters.MealType;
            roomType: Parameters.RoomType;
            maxPrice: Parameters.MaxPrice;
            oceanView: Parameters.OceanView
            pageSize : Parameters.pageSize;
            pageNumber: Parameters.pageNumber;

        }
        namespace Responses {
            export type $200 = Components.Schemas.GetBestHotelOffersResponse;
        }
    }
    namespace GetHotelOffers {
        namespace Parameters {
            export type CountAdults = number;
            export type CountChildren = number;
            export type DepartureAirports = string[];
            export type Duration = number;
            export type EarliestDepartureDate = string; // date
            export type HotelId = number;
            export type LatestReturnDate = string; // date
        }
        export interface PathParameters {
            hotelId: Parameters.HotelId;
        }
        export interface QueryParameters {
            earliestDepartureDate: Parameters.EarliestDepartureDate /* date */;
            latestReturnDate: Parameters.LatestReturnDate /* date */;
            duration: Parameters.Duration;
            countAdults: Parameters.CountAdults;
            countChildren: Parameters.CountChildren;
            departureAirports: Parameters.DepartureAirports;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetHotelOffersResponse;
        }
    }
}

export interface OperationMethods {
    /**
     * getBestOffersByHotel - get the best (i.e. cheapest) offer for every hotel that has at least one available offer for a given search
     */
    'getBestOffersByHotel'(
        parameters?: Parameters<Paths.GetBestOffersByHotel.QueryParameters> | null,
        data?: any,
        config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetBestOffersByHotel.Responses.$200>
    /**
     * GetHotelOffers - get available offers for a given hotel
     */
    'GetHotelOffers'(
        parameters?: Parameters<Paths.GetHotelOffers.PathParameters & Paths.GetHotelOffers.QueryParameters> | null,
        data?: any,
        config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetHotelOffers.Responses.$200>
}

export interface PathsDictionary {
    ['/bestOffersByHotel']: {
        /**
         * getBestOffersByHotel - get the best (i.e. cheapest) offer for every hotel that has at least one available offer for a given search
         */
        'get'(
            parameters?: Parameters<Paths.GetBestOffersByHotel.QueryParameters> | null,
            data?: any,
            config?: AxiosRequestConfig
        ): OperationResponse<Paths.GetBestOffersByHotel.Responses.$200>
    }
    ['/hotels/{hotelId}/offers']: {
        /**
         * GetHotelOffers - get available offers for a given hotel
         */
        'get'(
            parameters?: Parameters<Paths.GetHotelOffers.PathParameters & Paths.GetHotelOffers.QueryParameters> | null,
            data?: any,
            config?: AxiosRequestConfig
        ): OperationResponse<Paths.GetHotelOffers.Responses.$200>
    }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
