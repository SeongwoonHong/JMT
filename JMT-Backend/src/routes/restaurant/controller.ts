import { Request, Response } from 'express';
import axios from '@utils/axios';

const yelpNearByMockData = [
    {
        "id": "CB8HrynUWR4Odnj-XTY-Ew",
        "alias": "kookminhakgyo-toronto",
        "name": "Kookminhakgyo",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/UKn9ib3LPjQ-7WJRQtKTeA/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/kookminhakgyo-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 176,
        "categories": [
            {
                "alias": "korean",
                "title": "Korean"
            },
            {
                "alias": "bbq",
                "title": "Barbeque"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 43.78902,
            "longitude": -79.41831
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "6016 yonge street",
            "address2": null,
            "address3": "",
            "city": "Toronto",
            "zip_code": "M2M 3W2",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "6016 yonge street",
                "Toronto, ON M2M 3W2",
                "Canada"
            ]
        },
        "phone": "+16473488890",
        "display_phone": "+1 647-348-8890",
        "distance": 958.0060873127421
    },
    {
        "id": "iMoFE2g4kDG4FfKLJvk3Jw",
        "alias": "buk-chang-dong-soon-tofu-north-york-2",
        "name": "Buk Chang Dong Soon Tofu",
        "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/Th8LymTA3gr7qIQtipk97w/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/buk-chang-dong-soon-tofu-north-york-2?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 315,
        "categories": [
            {
                "alias": "korean",
                "title": "Korean"
            }
        ],
        "rating": 4,
        "coordinates": {
            "latitude": 43.7770435193004,
            "longitude": -79.4145441055298
        },
        "transactions": [],
        "price": "$",
        "location": {
            "address1": "5445 Yonge Street",
            "address2": "",
            "address3": "",
            "city": "North York",
            "zip_code": "M2N 5S1",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "5445 Yonge Street",
                "North York, ON M2N 5S1",
                "Canada"
            ]
        },
        "phone": "+16474307458",
        "display_phone": "+1 647-430-7458",
        "distance": 422.3544692273009
    },
    {
        "id": "4WW0U2mKgFYJILnWLmUwLA",
        "alias": "lim-ga-ne-toronto-2",
        "name": "Lim Ga Ne",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/6LI9dV5kPAPpuw1d0xsu0g/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/lim-ga-ne-toronto-2?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 124,
        "categories": [
            {
                "alias": "korean",
                "title": "Korean"
            }
        ],
        "rating": 3.5,
        "coordinates": {
            "latitude": 43.7784126,
            "longitude": -79.4150306
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "5529 Yonge Street",
            "address2": "",
            "address3": "",
            "city": "Toronto",
            "zip_code": "M2N 5S1",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "5529 Yonge Street",
                "Toronto, ON M2N 5S1",
                "Canada"
            ]
        },
        "phone": "+16474352700",
        "display_phone": "+1 647-435-2700",
        "distance": 267.2134752907136
    },
    {
        "id": "l07ctcrDMV--TYwe3uzebQ",
        "alias": "huh-ga-ne-toronto",
        "name": "Huh Ga Ne",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/N68MRNVf3NyYo9V9IvPBPA/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/huh-ga-ne-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 97,
        "categories": [
            {
                "alias": "korean",
                "title": "Korean"
            }
        ],
        "rating": 3.5,
        "coordinates": {
            "latitude": 43.7792767,
            "longitude": -79.4171614
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "19 Finch Avenue W",
            "address2": "Unit A",
            "address3": "",
            "city": "Toronto",
            "zip_code": "M2N 7K4",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "19 Finch Avenue W",
                "Unit A",
                "Toronto, ON M2N 7K4",
                "Canada"
            ]
        },
        "phone": "+14169011288",
        "display_phone": "+1 416-901-1288",
        "distance": 295.7618857876258
    },
    {
        "id": "Uq-15wDzsi6H7fImKHL0JQ",
        "alias": "gui-toronto",
        "name": "Gui",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/NgjxOYMdpSpoRF0tOHWpbw/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/gui-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 13,
        "categories": [
            {
                "alias": "korean",
                "title": "Korean"
            },
            {
                "alias": "bbq",
                "title": "Barbeque"
            }
        ],
        "rating": 4,
        "coordinates": {
            "latitude": 43.793208,
            "longitude": -79.4192262
        },
        "transactions": [],
        "location": {
            "address1": "6174 Yonge Street",
            "address2": "",
            "address3": null,
            "city": "Toronto",
            "zip_code": "M2M 3X1",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "6174 Yonge Street",
                "Toronto, ON M2M 3X1",
                "Canada"
            ]
        },
        "phone": "+16473469292",
        "display_phone": "+1 647-346-9292",
        "distance": 1429.220091465116
    },
    {
        "id": "4_L9bnIvY8TLDfiTBGcnRA",
        "alias": "daldongnae-toronto",
        "name": "Daldongnae",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/j0XCeX5o1HugL8WORRt6hA/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/daldongnae-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 156,
        "categories": [
            {
                "alias": "korean",
                "title": "Korean"
            },
            {
                "alias": "bbq",
                "title": "Barbeque"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 43.78971,
            "longitude": -79.41825
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "6034 Yonge Street",
            "address2": "",
            "address3": null,
            "city": "Toronto",
            "zip_code": "M2M 3W5",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "6034 Yonge Street",
                "Toronto, ON M2M 3W5",
                "Canada"
            ]
        },
        "phone": "+14162266034",
        "display_phone": "+1 416-226-6034",
        "distance": 1036.622134467376
    },
    {
        "id": "jCzrbfboRc3D-9_Gr0Wm9w",
        "alias": "songcooks-vaughan",
        "name": "SongCook's",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/ATxRbuPZFt4LPIrmaLbi1g/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/songcooks-vaughan?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 316,
        "categories": [
            {
                "alias": "korean",
                "title": "Korean"
            }
        ],
        "rating": 4,
        "coordinates": {
            "latitude": 43.798408145864,
            "longitude": -79.422262644077
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "72 Steeles Avenue W",
            "address2": "Unit 6",
            "address3": "",
            "city": "Vaughan",
            "zip_code": "L4J 1V7",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "72 Steeles Avenue W",
                "Unit 6",
                "Vaughan, ON L4J 1V7",
                "Canada"
            ]
        },
        "phone": "+16476788000",
        "display_phone": "+1 647-678-8000",
        "distance": 2053.404130308967
    },
    {
        "id": "Z5L-jOexcqCXfXWTIWnYlw",
        "alias": "jung-soo-nae-restaurant-north-york",
        "name": "Jung Soo Nae Restaurant",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/b4oOHOzppEmCgYP2pYj78w/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/jung-soo-nae-restaurant-north-york?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 46,
        "categories": [
            {
                "alias": "korean",
                "title": "Korean"
            }
        ],
        "rating": 3.5,
        "coordinates": {
            "latitude": 43.78331,
            "longitude": -79.41696
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "5754 Yonge Street",
            "address2": "",
            "address3": "",
            "city": "North York",
            "zip_code": "M2M 3T6",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "5754 Yonge Street",
                "North York, ON M2M 3T6",
                "Canada"
            ]
        },
        "phone": "+14162224267",
        "display_phone": "+1 416-222-4267",
        "distance": 341.98452505470493
    },
    {
        "id": "efOtTiIqTvLijm3kIYgqPQ",
        "alias": "chowon-family-restaurant-north-york",
        "name": "Chowon Family Restaurant",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/oQAHNXw5qUm8C8Sf8m4XVg/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/chowon-family-restaurant-north-york?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 74,
        "categories": [
            {
                "alias": "korean",
                "title": "Korean"
            }
        ],
        "rating": 3.5,
        "coordinates": {
            "latitude": 43.78665,
            "longitude": -79.4185399
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "17 Drewry Avenue",
            "address2": "",
            "address3": "",
            "city": "North York",
            "zip_code": "M2M 1C9",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "17 Drewry Avenue",
                "North York, ON M2M 1C9",
                "Canada"
            ]
        },
        "phone": "+14162507422",
        "display_phone": "+1 416-250-7422",
        "distance": 718.3758816046218
    },
    {
        "id": "LHMPtp-2fsjSsxrLxtLeXA",
        "alias": "oh-geul-boh-geul-restaurant-north-york",
        "name": "Oh Geul Boh Geul Restaurant",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/NgiZtj3cVX26g564bDHc-A/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/oh-geul-boh-geul-restaurant-north-york?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 142,
        "categories": [
            {
                "alias": "korean",
                "title": "Korean"
            }
        ],
        "rating": 3.5,
        "coordinates": {
            "latitude": 43.7731359,
            "longitude": -79.4140716
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "5320 Yonge St",
            "address2": "",
            "address3": "",
            "city": "North York",
            "zip_code": "M2N 5P9",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "5320 Yonge St",
                "North York, ON M2N 5P9",
                "Canada"
            ]
        },
        "phone": "+14167333385",
        "display_phone": "+1 416-733-3385",
        "distance": 854.9266598757679
    },
    {
        "id": "Y1jrsVAWK1bFC_s1CJmICw",
        "alias": "go-topoki-toronto",
        "name": "Go Topoki",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/C23WTmGGLmP98-pz1aWZJQ/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/go-topoki-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 90,
        "categories": [
            {
                "alias": "korean",
                "title": "Korean"
            }
        ],
        "rating": 4,
        "coordinates": {
            "latitude": 43.7748838434756,
            "longitude": -79.4140006773849
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "5 Northtown Way",
            "address2": "Unit 5",
            "address3": "",
            "city": "Toronto",
            "zip_code": "M2N 7A1",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "5 Northtown Way",
                "Unit 5",
                "Toronto, ON M2N 7A1",
                "Canada"
            ]
        },
        "phone": "+14165512162",
        "display_phone": "+1 416-551-2162",
        "distance": 662.9934696048854
    },
    {
        "id": "v-z5Tw5ds2sEvtk3Kj5x4w",
        "alias": "yupdduk-toronto",
        "name": "Yupdduk",
        "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/FuEtLb18OBwXtrYUx4BrRw/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/yupdduk-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 29,
        "categories": [
            {
                "alias": "korean",
                "title": "Korean"
            }
        ],
        "rating": 3,
        "coordinates": {
            "latitude": 43.77942,
            "longitude": -79.41759
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "24-30 Finch Avenue W",
            "address2": "",
            "address3": "",
            "city": "Toronto",
            "zip_code": "M2N",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "24-30 Finch Avenue W",
                "Toronto, ON M2N",
                "Canada"
            ]
        },
        "phone": "",
        "display_phone": "",
        "distance": 306.40119523703675
    },
    {
        "id": "khOsPUxJuf5R3cmgiZnk6g",
        "alias": "mr-chu-toronto",
        "name": "Mr Chu",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/RYSeQWTiPySsq-1JGb6m1w/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/mr-chu-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 105,
        "categories": [
            {
                "alias": "desserts",
                "title": "Desserts"
            },
            {
                "alias": "korean",
                "title": "Korean"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 43.7792132602969,
            "longitude": -79.4170891866088
        },
        "transactions": [],
        "price": "$",
        "location": {
            "address1": "15B Finch Avenue W",
            "address2": "",
            "address3": null,
            "city": "Toronto",
            "zip_code": "M2N 7K4",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "15B Finch Avenue W",
                "Toronto, ON M2N 7K4",
                "Canada"
            ]
        },
        "phone": "+16472411889",
        "display_phone": "+1 647-241-1889",
        "distance": 282.8888816861839
    },
    {
        "id": "tu_bhkTGMkieJeOH3uQVHQ",
        "alias": "nak-won-north-york",
        "name": "Nak Won",
        "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/6rW0OK6F8XC-ApEgG37WOQ/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/nak-won-north-york?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 151,
        "categories": [
            {
                "alias": "korean",
                "title": "Korean"
            }
        ],
        "rating": 3,
        "coordinates": {
            "latitude": 43.7793859,
            "longitude": -79.4156465
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "5594 Yonge Street",
            "address2": "",
            "address3": null,
            "city": "North York",
            "zip_code": "M2N 5S4",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "5594 Yonge Street",
                "North York, ON M2N 5S4",
                "Canada"
            ]
        },
        "phone": "+14165901435",
        "display_phone": "+1 416-590-1435",
        "distance": 197.89038366111134
    },
    {
        "id": "IikkB8j2E-1QmujRsPh5wQ",
        "alias": "kayagum-toronto",
        "name": "Kayagum",
        "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/pIkLDjc95YHVNSRMNrypgw/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/kayagum-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 118,
        "categories": [
            {
                "alias": "korean",
                "title": "Korean"
            }
        ],
        "rating": 3,
        "coordinates": {
            "latitude": 43.77738436969,
            "longitude": -79.415295124054
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "5460 Yonge Street",
            "address2": "",
            "address3": "",
            "city": "Toronto",
            "zip_code": "M2N 6K7",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "5460 Yonge Street",
                "Toronto, ON M2N 6K7",
                "Canada"
            ]
        },
        "phone": "+16473408086",
        "display_phone": "+1 647-340-8086",
        "distance": 391.2089557539044
    },
    {
        "id": "VC_67dpNS6bDk7qE47Atsg",
        "alias": "drunken-chicken-toronto-2",
        "name": "Drunken Chicken",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/SoqQ_-hiETqLkUOtDIlSjw/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/drunken-chicken-toronto-2?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 15,
        "categories": [
            {
                "alias": "korean",
                "title": "Korean"
            }
        ],
        "rating": 4.5,
        "coordinates": {
            "latitude": 43.79058,
            "longitude": -79.4185399
        },
        "transactions": [],
        "location": {
            "address1": "6070 Yonge Street",
            "address2": "",
            "address3": "",
            "city": "Toronto",
            "zip_code": "M2M 3W6",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "6070 Yonge Street",
                "Toronto, ON M2M 3W6",
                "Canada"
            ]
        },
        "phone": "+14165120488",
        "display_phone": "+1 416-512-0488",
        "distance": 1068.6458127322203
    },
    {
        "id": "FQzSV_tUK7XG-bAoJ9sRSA",
        "alias": "pujukan-toronto",
        "name": "Pujukan",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/9W2PU7niNMZBSxURyNF3Pg/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/pujukan-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 13,
        "categories": [
            {
                "alias": "korean",
                "title": "Korean"
            },
            {
                "alias": "bbq",
                "title": "Barbeque"
            }
        ],
        "rating": 4,
        "coordinates": {
            "latitude": 43.76262,
            "longitude": -79.41152
        },
        "transactions": [],
        "location": {
            "address1": "4852 Yonge Street",
            "address2": "",
            "address3": null,
            "city": "Toronto",
            "zip_code": "M2N 5N2",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "4852 Yonge Street",
                "Toronto, ON M2N 5N2",
                "Canada"
            ]
        },
        "phone": "+14168400589",
        "display_phone": "+1 416-840-0589",
        "distance": 2037.0484896438263
    },
    {
        "id": "EO3i5kTUG7_S2OIQ23sdSA",
        "alias": "mot-na-son-restaurant-north-york",
        "name": "Mot Na Son Restaurant",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/H5O5Elg-2Tk9BWyBN7kocA/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/mot-na-son-restaurant-north-york?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 42,
        "categories": [
            {
                "alias": "korean",
                "title": "Korean"
            }
        ],
        "rating": 3.5,
        "coordinates": {
            "latitude": 43.7745839,
            "longitude": -79.4144356
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "5374 Yonge St",
            "address2": "",
            "address3": "",
            "city": "North York",
            "zip_code": "M2N 5R5",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "5374 Yonge St",
                "North York, ON M2N 5R5",
                "Canada"
            ]
        },
        "phone": "+14162221170",
        "display_phone": "+1 416-222-1170",
        "distance": 711.3161272586442
    },
    {
        "id": "Yk-M1qkLN_QNHUhxBtO4bw",
        "alias": "roll-toronto",
        "name": "Roll",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/Cm-QIP6Zexwt5Evio9JbNQ/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/roll-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 30,
        "categories": [
            {
                "alias": "korean",
                "title": "Korean"
            }
        ],
        "rating": 4,
        "coordinates": {
            "latitude": 43.77511,
            "longitude": -79.41379
        },
        "transactions": [],
        "price": "$",
        "location": {
            "address1": "5 Northtown Way",
            "address2": "Unit 10",
            "address3": "",
            "city": "Toronto",
            "zip_code": "M2N 7A1",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "5 Northtown Way",
                "Unit 10",
                "Toronto, ON M2N 7A1",
                "Canada"
            ]
        },
        "phone": "+14165128788",
        "display_phone": "+1 416-512-8788",
        "distance": 674.8094744581065
    },
    {
        "id": "KxcQs2Lkm3FJiltVWXOz_Q",
        "alias": "hashi-izakaya-toronto",
        "name": "Hashi Izakaya",
        "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/sHkdGGApu33hlcKs-sN_XA/o.jpg",
        "is_closed": false,
        "url": "https://www.yelp.com/biz/hashi-izakaya-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
        "review_count": 51,
        "categories": [
            {
                "alias": "japanese",
                "title": "Japanese"
            },
            {
                "alias": "korean",
                "title": "Korean"
            },
            {
                "alias": "bars",
                "title": "Bars"
            }
        ],
        "rating": 3.5,
        "coordinates": {
            "latitude": 43.779256,
            "longitude": -79.415713
        },
        "transactions": [],
        "price": "$$",
        "location": {
            "address1": "5582 Yonge Street",
            "address2": "",
            "address3": "",
            "city": "Toronto",
            "zip_code": "M2N 5S2",
            "country": "CA",
            "state": "ON",
            "display_address": [
                "5582 Yonge Street",
                "Toronto, ON M2N 5S2",
                "Canada"
            ]
        },
        "phone": "+14162248179",
        "display_phone": "+1 416-224-8179",
        "distance": 206.09538812465075
    }
]

export const getRestaurantDetail = async (req: Request, res: Response) => {
  // id = CB8HrynUWR4Odnj-XTY-Ew -> kookminhakyo
  const { id } = req.query;
  const endpoint = `https://api.yelp.com/v3/businesses/${id}`;
  console.log(endpoint)
  try {
    const dataRes = await axios.get(endpoint);

    return res.json(dataRes.data);
  } catch (e) {
    return res.status(404).json({
      success: false,
      msg: e.message,
    })
  }
}

export const searchRestaurant = async (req: Request, res: Response) => {
  const { keyword, location, latitude, longitude } = req.query;
  let endpoint;

  if (location) {
    endpoint = `https://api.yelp.com/v3/businesses/search?term=${keyword}&location=${location}`;
  } else { // for current location
    endpoint = `https://api.yelp.com/v3/businesses/search?term=${keyword}&latitude=${latitude}&longitude=${longitude}&radius=1500`;
  }

  try {
    const data = await axios.get(endpoint);
    const { data: { businesses } } = data;
    const validBusinesses = businesses.filter((business) => business.coordinates.latitude && business.coordinates.longitude);

    return res.json(validBusinesses);

  } catch (e) {
    return res.status(404).json({
      success: false,
      msg: e.message
    });
  }
}
