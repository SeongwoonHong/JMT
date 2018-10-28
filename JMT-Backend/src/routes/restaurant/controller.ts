import { Request, Response } from 'express';
import axios from 'axios';

const {
  GOOGLE_PLACE_API_KEY: placeApiKey,
  YELP_API_KEY: yelpApiKey
} = process.env;

// google data example
const nearByMockData = {
  "html_attributions": [],
  "results": [
      {
          "geometry": {
              "location": {
                  "lat": 43.7744838,
                  "lng": -79.4144723
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.77584997989272,
                      "lng": -79.41299672010729
                  },
                  "southwest": {
                      "lat": 43.77315032010728,
                      "lng": -79.41569637989272
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "8056077e2011d229622daa37fbc705c0d4a910a8",
          "name": "Mot Na Son Restaurant",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 2610,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/103413517910135016326/photos\">michelle Lee</a>"
                  ],
                  "photo_reference": "CmRaAAAAFXW61qgTjzuy_eOJZD6y_dCQQMte33tXTmIxfXuD6RmmRyjdid_iny6S1JXm5Cdmlq7t7LYc9b9uMjqOyUkiK-5VgT30cmYBThrJb1sEZt_leFTvIBveCiQnm_CuBr-nEhDt-rUQkH1p2tfyJ5Wg5eVKGhRc8buZShN8o6LB26NbPzWpcYygKg",
                  "width": 4640
              }
          ],
          "place_id": "ChIJmUbUpnItK4gRYFwrLA3wBR8",
          "plus_code": {
              "compound_code": "QHFP+Q6 Toronto, Ontario",
              "global_code": "87M2QHFP+Q6"
          },
          "rating": 4.2,
          "reference": "ChIJmUbUpnItK4gRYFwrLA3wBR8",
          "scope": "GOOGLE",
          "types": [
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "5374 Yonge St, North York"
      },
      {
          "geometry": {
              "location": {
                  "lat": 43.7733107,
                  "lng": -79.4141973
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.77467747989272,
                      "lng": -79.41270992010728
                  },
                  "southwest": {
                      "lat": 43.77197782010727,
                      "lng": -79.41540957989272
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "b381686cc65122ef5699ef8a7875fbe0254a5e47",
          "name": "The Famous Owl of Minerva",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 3006,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/111431822971972285859/photos\">Ms Paul</a>"
                  ],
                  "photo_reference": "CmRaAAAAN9c_28K7BNJWCHnGxfXdPRD-SI1FGVIUFbq_MR6lCFdDcDQLEUZF8q5f6TxuruUcNdXtJLavHSTxMwm9B1X3rihqglB-ELx6shcK0o_cdq1f8DKoljYQbe8fPRobIgCEEhADo2HuTsjIuu4imHNQN5IFGhQoVJAtsP2t3kZOIHCBNg1qQFF0Kg",
                  "width": 5344
              }
          ],
          "place_id": "ChIJmWDGfW0tK4gRwhzl1oXnUNE",
          "plus_code": {
              "compound_code": "QHFP+88 Toronto, Ontario",
              "global_code": "87M2QHFP+88"
          },
          "price_level": 1,
          "rating": 4,
          "reference": "ChIJmWDGfW0tK4gRwhzl1oXnUNE",
          "scope": "GOOGLE",
          "types": [
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "5324 Yonge St, North York"
      },
      {
          "geometry": {
              "location": {
                  "lat": 43.78970289999999,
                  "lng": -79.4182561
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.79107077989272,
                      "lng": -79.41678312010727
                  },
                  "southwest": {
                      "lat": 43.78837112010728,
                      "lng": -79.41948277989272
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "1b3f26b1a9ebd4ceabfb89a87495d8268ce50d17",
          "name": "Daldongnae Korean BBQ",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 3024,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/102494045281318181900/photos\">Jason Lam</a>"
                  ],
                  "photo_reference": "CmRaAAAADIIC1KhTyb-VHtEpaL2v5WV0XAeTmtcBREOC4ox4Faw_f21gGOF3QaRuDGE5QGxlJxTaINTNXfWsOblxfWK0YJ7QfzCM6oocRirH6P1ITgMDX22DWsvBXQzns2wdxd2JEhCAi-H0NEPsyBkYsBNw-TU7GhQcWgkB0qhE_mks6CJrdXRDi1yzBg",
                  "width": 4032
              }
          ],
          "place_id": "ChIJv5K-dAQtK4gRbNAx7ZGh8qU",
          "plus_code": {
              "compound_code": "QHQJ+VM Toronto, Ontario",
              "global_code": "87M2QHQJ+VM"
          },
          "price_level": 2,
          "rating": 4.5,
          "reference": "ChIJv5K-dAQtK4gRbNAx7ZGh8qU",
          "scope": "GOOGLE",
          "types": [
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "6034 Yonge St, North York"
      },
      {
          "geometry": {
              "location": {
                  "lat": 43.7791694,
                  "lng": -79.41724669999999
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.78062202989272,
                      "lng": -79.41594172010727
                  },
                  "southwest": {
                      "lat": 43.77792237010728,
                      "lng": -79.41864137989272
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "da134df97ccaae6aa943644741c61c024fca83d7",
          "name": "Huh Ga Ne",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 1536,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/104649491300037852500/photos\">yun Luo</a>"
                  ],
                  "photo_reference": "CmRaAAAAXY-VN6Q3ZOdNP5lUiZezdK0oqExMh75N5rE583f6AaWtbdEZoNaDvvuSIN9qHmBatBuY0de07AKjej_HLTqiQYHzPZuazA5NA0QuNfzaMHGeMfJcTC4Gmhwd-ADNhWZ8EhD-4bg238TJSV_ruws-KQsHGhSFMSl9sGReKMoeUn1xjYbBF_uyTQ",
                  "width": 2048
              }
          ],
          "place_id": "ChIJ7UGSNwwtK4gRHuDL_7DO9v4",
          "plus_code": {
              "compound_code": "QHHM+M4 Toronto, Ontario",
              "global_code": "87M2QHHM+M4"
          },
          "rating": 4.1,
          "reference": "ChIJ7UGSNwwtK4gRHuDL_7DO9v4",
          "scope": "GOOGLE",
          "types": [
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "19 Finch Ave W, North York"
      },
      {
          "geometry": {
              "location": {
                  "lat": 43.7794061,
                  "lng": -79.4157613
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.78077147989271,
                      "lng": -79.41430702010727
                  },
                  "southwest": {
                      "lat": 43.77807182010727,
                      "lng": -79.41700667989271
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "ceeba050c90cc83d7f102b16ee3824242859e621",
          "name": "Nak Won Restaurant",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 4032,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/103155154121382460049/photos\">Duke Lekic</a>"
                  ],
                  "photo_reference": "CmRaAAAAGiA9yJKtLh3VrLHGi3RGM3I4ZYkafOJ7dFwoMESkV_srAOwfTbyk8lEe_WUv0vr79hLRUIkOKKUEYrcbJmiES7k4CBOGB9P-XvHMcvzissubqp7JmJ1zI8IPINEQs8ZVEhBynUziVZ_xyhXYIDM1Y6hRGhSLIKxDdWwAby073uWbfQNtPuV_zg",
                  "width": 3024
              }
          ],
          "place_id": "ChIJs6vPuA0tK4gRHMHV8D0_4L4",
          "plus_code": {
              "compound_code": "QHHM+QM Toronto, Ontario",
              "global_code": "87M2QHHM+QM"
          },
          "price_level": 1,
          "rating": 3.5,
          "reference": "ChIJs6vPuA0tK4gRHMHV8D0_4L4",
          "scope": "GOOGLE",
          "types": [
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "5594 Yonge St, North York"
      },
      {
          "geometry": {
              "location": {
                  "lat": 43.7795667,
                  "lng": -79.4158326
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.78091217989272,
                      "lng": -79.41458377010727
                  },
                  "southwest": {
                      "lat": 43.77821252010727,
                      "lng": -79.41728342989272
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "4494601815fa2e26a80c165b4f0d039d540979b6",
          "name": "SSAM Toronto Korean BBQ & Grill",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 1536,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/109540043185446906520/photos\">A Google User</a>"
                  ],
                  "photo_reference": "CmRaAAAADNF0koCN0Hhrb77jU_JWJpuHalw9VaKvfPTwUzXZrXhmayT74j-rfT3mclT1sRDLX_nN-6I8iszhyQQhU45Ibves4A2BD_1nTZwhA07bMkUechrDs6N3ZN8P1wFJ3zSVEhDVkA7xkQFq6_XxtyK_aJ28GhSt77Tj_6LWyfuLuHZaQJM4UYN7Ow",
                  "width": 2048
              }
          ],
          "place_id": "ChIJJcL-wQ0tK4gRphv-7s8Pldk",
          "plus_code": {
              "compound_code": "QHHM+RM Toronto, Ontario",
              "global_code": "87M2QHHM+RM"
          },
          "price_level": 2,
          "rating": 4.1,
          "reference": "ChIJJcL-wQ0tK4gRphv-7s8Pldk",
          "scope": "GOOGLE",
          "types": [
              "bar",
              "meal_takeaway",
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "5600 Yonge St, North York"
      },
      {
          "geometry": {
              "location": {
                  "lat": 43.7731966,
                  "lng": -79.4140905
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.77455962989273,
                      "lng": -79.41264142010728
                  },
                  "southwest": {
                      "lat": 43.77185997010729,
                      "lng": -79.41534107989271
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "5160963284be9f725942cbe768d9ec798a3ab5ca",
          "name": "Oh Geul Boh Geul",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 2988,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/108574021930712706170/photos\">Vijay Kumar</a>"
                  ],
                  "photo_reference": "CmRaAAAAD0USohmzwX1quiCVzBPy3XTjtOVFnbCPievfoK_7shiJHwsi-1zfT-_nwOw7XCktTZhGwsqSkhr4OWKWmbzZ1IEffUJIUbrkUxq0vmpmD7FKPeMtG0Xkzahgq_vEmE3AEhAoFoO4PhbW0r_bIsFcPnaTGhTyPCAKvZ0jI-360DGQ1jDbRt-EaA",
                  "width": 5312
              }
          ],
          "place_id": "ChIJz5Vafm0tK4gRFAaKYV_wyYw",
          "plus_code": {
              "compound_code": "QHFP+79 Toronto, Ontario",
              "global_code": "87M2QHFP+79"
          },
          "price_level": 1,
          "rating": 3.8,
          "reference": "ChIJz5Vafm0tK4gRFAaKYV_wyYw",
          "scope": "GOOGLE",
          "types": [
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "5320 Yonge St, North York"
      },
      {
          "geometry": {
              "location": {
                  "lat": 43.7784777,
                  "lng": -79.4149908
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.77981247989273,
                      "lng": -79.41375547010729
                  },
                  "southwest": {
                      "lat": 43.77711282010728,
                      "lng": -79.41645512989274
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "65aba1e051fc03525c2289c846f42c3b939861ec",
          "name": "Lim Ga Ne",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 3024,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/114547426552467948683/photos\">Hamed Seifollahi</a>"
                  ],
                  "photo_reference": "CmRaAAAAMZRO1OBv5RdaAwwSfN65UFLpV82kVFTXIxkFUvIHx8WqW-KbdKOQhDy8YNF8YI5WUIskhCgSqS1AA_vgq2Ed2NWx3Z50OlAfyIbjtCAiT54o10_4ZEI2M4JIpeJP7vRgEhBO1B5wHFfDs5VL5gq3K4m4GhQsxw_AJtPpBHTwMZ5tEbgWGmbfkQ",
                  "width": 4032
              }
          ],
          "place_id": "ChIJ9Ulsmg0tK4gRjwkN3k8jBPc",
          "plus_code": {
              "compound_code": "QHHP+92 Toronto, Ontario",
              "global_code": "87M2QHHP+92"
          },
          "rating": 3.8,
          "reference": "ChIJ9Ulsmg0tK4gRjwkN3k8jBPc",
          "scope": "GOOGLE",
          "types": [
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "5529 Yonge St, North York"
      },
      {
          "geometry": {
              "location": {
                  "lat": 43.7867295,
                  "lng": -79.4181681
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.78817862989273,
                      "lng": -79.41685567010728
                  },
                  "southwest": {
                      "lat": 43.78547897010728,
                      "lng": -79.41955532989272
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "6e0f52743e257c2f0e92f11befc01720ff386397",
          "name": "Cho Won Family Restaurant",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 3024,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/116404262608602393031/photos\">Heayoung Byun</a>"
                  ],
                  "photo_reference": "CmRaAAAAX40LDKE13o25Gxi-4oshkvbAi76lbJERfR4KibshDSxXVGkAT0Q17UvQZI4TK5v8sNkThwqJp4xBILf6Nx3RjuOmNWzlr6O6m6FDDjoZ33-Dqfzk6yDPA7FcAl0KhJ1BEhCxtTfrs-fUtlJcG78dDMzEGhS9LPDTVDM3uUfGKDGEl5HKNOfeBA",
                  "width": 4032
              }
          ],
          "place_id": "ChIJb2xvuAUtK4gRfLOWEZzoU9M",
          "plus_code": {
              "compound_code": "QHPJ+MP Toronto, Ontario",
              "global_code": "87M2QHPJ+MP"
          },
          "price_level": 2,
          "rating": 3.9,
          "reference": "ChIJb2xvuAUtK4gRfLOWEZzoU9M",
          "scope": "GOOGLE",
          "types": [
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "17 Drewry Ave, North York"
      },
      {
          "geometry": {
              "location": {
                  "lat": 43.7773323,
                  "lng": -79.4146749
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.77868212989272,
                      "lng": -79.41332507010728
                  },
                  "southwest": {
                      "lat": 43.77598247010728,
                      "lng": -79.41602472989273
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "1de121c928d3eee6484d2cd1a2dd8a7a90b67cb4",
          "name": "Shanghai Korean Chinese Restaurant",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 4608,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/103413517910135016326/photos\">michelle Lee</a>"
                  ],
                  "photo_reference": "CmRaAAAACCF8sDJ02bMII6YZt8bH0w4548JYO1_1P_oHz0MvTUYuH49Ji9mYdjqKVoOBrHE3kQz1RFwjKG7ywabSdHreAXCxCUHLBbyB1H4jPPHEVwz8NpGliqx5p0zri1_ZinRNEhCO5DzaUfSI8I1MKmrfBw7KGhTZV-AxF0CH3PdiUnvRhNo_YwyH_g",
                  "width": 2304
              }
          ],
          "place_id": "ChIJGxrweg0tK4gR_42f_HlzUjs",
          "rating": 3.5,
          "reference": "ChIJGxrweg0tK4gR_42f_HlzUjs",
          "scope": "GOOGLE",
          "types": [
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "5451 Yonge Street North York ON M2N 5S1"
      },
      {
          "geometry": {
              "location": {
                  "lat": 43.7771157,
                  "lng": -79.4146312
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.77845162989272,
                      "lng": -79.41340347010728
                  },
                  "southwest": {
                      "lat": 43.77575197010728,
                      "lng": -79.41610312989273
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "7a05d1e667eeec7f487ae8e784aa0b16412ec8b6",
          "name": "Buk Chang Dong Soon Tofu",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 3024,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/116404262608602393031/photos\">Heayoung Byun</a>"
                  ],
                  "photo_reference": "CmRaAAAAvbsnwXrYYOjcbm5Hf169OGeEJX32jfZ3rhJkXtwG5Db174cF5SOzCOTy_Lsah8q2RZZlbncQZc_WTYi2Gnysfj9_kje8Xinj82g1bzhToweMrcD4Q6TnFTB1qWIlxDODEhAMVLhieomAW2m5BSnrSv_HGhTk8USxNiJhVVCwnd7L0yMZOEuAuw",
                  "width": 4032
              }
          ],
          "place_id": "ChIJN2UnZQ0tK4gRXQ-sUakD0-4",
          "plus_code": {
              "compound_code": "QHGP+R4 Toronto, Ontario",
              "global_code": "87M2QHGP+R4"
          },
          "price_level": 1,
          "rating": 4.2,
          "reference": "ChIJN2UnZQ0tK4gRXQ-sUakD0-4",
          "scope": "GOOGLE",
          "types": [
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "5445 Yonge St, North York"
      },
      {
          "geometry": {
              "location": {
                  "lat": 43.7750818,
                  "lng": -79.41408229999999
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.77650257989271,
                      "lng": -79.41276382010726
                  },
                  "southwest": {
                      "lat": 43.77380292010727,
                      "lng": -79.41546347989271
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "3cc0d96e0162ea44317cea3de835d260d2c91be2",
          "name": "Roll.Com",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 2448,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/115958246853253558411/photos\">A Google User</a>"
                  ],
                  "photo_reference": "CmRaAAAAbDOV33xaWjT_nj6Y_9bv9kKLqDe_kkCRUMM3xK9l_uWUlOG22CpCRtN8WsHpdX4vUsvGuH_Wo1MMYFW9Qxo524NhGh5Essp9k6zPimSgjMVAAajO-DrUXxsUoZjmE5rkEhB6qUdsnyG31rqm9zzUTrPKGhQezDAP1tOkXFqqbZjtqtkmPctYxw",
                  "width": 3264
              }
          ],
          "place_id": "ChIJTXy9VW0tK4gRHjLxfPmhPHs",
          "plus_code": {
              "compound_code": "QHGP+29 Toronto, Ontario",
              "global_code": "87M2QHGP+29"
          },
          "rating": 3.8,
          "reference": "ChIJTXy9VW0tK4gRHjLxfPmhPHs",
          "scope": "GOOGLE",
          "types": [
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "5 Northtown Way #10, North York"
      },
      {
          "geometry": {
              "location": {
                  "lat": 43.779368,
                  "lng": -79.4158281
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.78077232989272,
                      "lng": -79.41459142010727
                  },
                  "southwest": {
                      "lat": 43.77807267010728,
                      "lng": -79.41729107989272
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "f2b061799b9016ca66ed9af506ac7101113374c4",
          "name": "Pyung Won House",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 480,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/114331919870051800179/photos\">Hanako M.</a>"
                  ],
                  "photo_reference": "CmRaAAAAXaS1L3OqbrUAYPxO0f8Tqrfr9-pk91a3-W0A-rvk-kzdgMZZYabbcYe7u91GIym0cc7Yt31-CJGJIv-HTZp2uO0TyKM7GyKnOTGLCVEJLPHDzHqGboBv7VNUNttD4I3OEhASiWm8p2RXQTXErdvfqqBdGhTCWr6kUjSn_YU4agJxG7oVecHFJQ",
                  "width": 640
              }
          ],
          "place_id": "ChIJF2r76Q0tK4gR55QEofDN6ns",
          "plus_code": {
              "compound_code": "QHHM+PM Toronto, Ontario",
              "global_code": "87M2QHHM+PM"
          },
          "rating": 3.2,
          "reference": "ChIJF2r76Q0tK4gR55QEofDN6ns",
          "scope": "GOOGLE",
          "types": [
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "5588 Yonge St, North York"
      },
      {
          "geometry": {
              "location": {
                  "lat": 43.7791978,
                  "lng": -79.4170573
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.78057347989272,
                      "lng": -79.41557537010728
                  },
                  "southwest": {
                      "lat": 43.77787382010727,
                      "lng": -79.41827502989271
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "755b84ff95b5e37d356425f9f79bd9485c9d3738",
          "name": "Cook's Fine Food Mart",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 3024,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/116969902145433568089/photos\">Jonathan Chung</a>"
                  ],
                  "photo_reference": "CmRaAAAAkc1O1y2o0Jk1Aa3Hq46umWnErwLTHYNS73HEd9aNfyi1XDIs1w8_rI3sGAuLijpHED5hNarvpWuSIRyBjonIGPNGdLTPw46tmiXzpMAoQ6sGeDqxD5iTpjcR3vfDN-2ZEhAMtpBryZv-Vt7hJkLDxsStGhQ3OeSS_Xh2YEY6hQzYM5XPaNqJoA",
                  "width": 4032
              }
          ],
          "place_id": "ChIJCe2qSgwtK4gR5yEte-54HsY",
          "plus_code": {
              "compound_code": "QHHM+M5 Toronto, Ontario",
              "global_code": "87M2QHHM+M5"
          },
          "rating": 4.5,
          "reference": "ChIJCe2qSgwtK4gR5yEte-54HsY",
          "scope": "GOOGLE",
          "types": [
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "15 Finch Ave W, North York"
      },
      {
          "geometry": {
              "location": {
                  "lat": 43.777397,
                  "lng": -79.41520489999999
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.77874682989272,
                      "lng": -79.41385507010727
                  },
                  "southwest": {
                      "lat": 43.77604717010727,
                      "lng": -79.41655472989272
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "9d6b5717e231cdf1c3787996e69e7b81419d351c",
          "name": "Kayagum Restaurant",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 2988,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/108877625553558444961/photos\">Sammy Mak</a>"
                  ],
                  "photo_reference": "CmRaAAAAB4HQ9to0eSikePNWBVyY5aMRgUQIID88W43S1t-lj4XcsPIatbPUqtKh6EPGEE65J_hXBGN80AENsnOjbsA7w6GREQV5CPn1B-OxyTxYjmVgGYMZ6qI7VmgEBAAFyfLLEhDYITeWpMe5re2QBkgAVVT7GhQo73HgTtgYHGxTz10iRdhyAVwwyg",
                  "width": 5312
              }
          ],
          "place_id": "ChIJ8YfkcA0tK4gR-3hI07cbLKI",
          "plus_code": {
              "compound_code": "QHGM+XW Toronto, Ontario",
              "global_code": "87M2QHGM+XW"
          },
          "rating": 3.7,
          "reference": "ChIJ8YfkcA0tK4gR-3hI07cbLKI",
          "scope": "GOOGLE",
          "types": [
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "5460 Yonge Street #100, North York"
      },
      {
          "geometry": {
              "location": {
                  "lat": 43.7951819,
                  "lng": -79.4347398
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.79638017989272,
                      "lng": -79.43332822010728
                  },
                  "southwest": {
                      "lat": 43.79368052010728,
                      "lng": -79.43602787989273
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "9c3a688a74372a0e9380414b9f86f787fbfe3bd4",
          "name": "Sunny Dragon Restaurant 해룡반점",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 4160,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/104364556070200190244/photos\">Kevin Ku</a>"
                  ],
                  "photo_reference": "CmRaAAAAouLTY9Y8vA_sIRPqh66UZDfBucdqvjPkzYmo_Z9uThE-eoKvmyYqnydq_aK1DFTNWGOtMaNzbryg2FBhqA2Hwg06NB5IgNzaBWlrTiCwYCk7_GuuP9jJ108vPh6aElAGEhBrjrnsSa_xqFVmO2LLr8zwGhQreI2glKetVXF609S5rVgoHboE2A",
                  "width": 3120
              }
          ],
          "place_id": "ChIJ9W4rGK0tK4gRrZP5AG2nDLk",
          "plus_code": {
              "compound_code": "QHW8+34 Vaughan, King, ON",
              "global_code": "87M2QHW8+34"
          },
          "rating": 4,
          "reference": "ChIJ9W4rGK0tK4gRrZP5AG2nDLk",
          "scope": "GOOGLE",
          "types": [
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "398 Steeles Ave W #1&2, Thornhill"
      },
      {
          "geometry": {
              "location": {
                  "lat": 43.7960739,
                  "lng": -79.4341316
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.79748812989271,
                      "lng": -79.43242777010727
                  },
                  "southwest": {
                      "lat": 43.79478847010727,
                      "lng": -79.43512742989272
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "be52ff317e2d3ad04bcc1acb18d3dce8ed7b213c",
          "name": "Jung Soo Ne korean Restaurant",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 3036,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/114523884706667813148/photos\">Rachel Lin</a>"
                  ],
                  "photo_reference": "CmRaAAAAbHEpxkwTN94c5LPlWTLh5N1mhZzSAkoW8sQimaNpxsAmk2oqr37Uqj-vdBD5CSPA12mTy_iI2yp4EU3LS3x4F3BG66TAIqR-CdoXQsdSDMtUC5Bt83W4WdFg-NmOo0QaEhB2SxREnxLeiy-vcBBuV7sTGhQtCPbCi812eGLWeGzyGhDh2hnH9Q",
                  "width": 4048
              }
          ],
          "place_id": "ChIJi7n3rE8qK4gRgNBWJSAgtac",
          "plus_code": {
              "compound_code": "QHW8+C8 Vaughan, King, ON",
              "global_code": "87M2QHW8+C8"
          },
          "rating": 3.8,
          "reference": "ChIJi7n3rE8qK4gRgNBWJSAgtac",
          "scope": "GOOGLE",
          "types": [
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "390 Steeles Ave W #5, Thornhill"
      },
      {
          "geometry": {
              "location": {
                  "lat": 43.78333869999999,
                  "lng": -79.4168213
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.78464162989272,
                      "lng": -79.41545347010728
                  },
                  "southwest": {
                      "lat": 43.78194197010728,
                      "lng": -79.41815312989273
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "d3bbe5d2ad7054d5f2584c567f9d19292aab5e07",
          "name": "Jung Soo Nae Restaurant",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 3024,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/108451341521942537890/photos\">A Google User</a>"
                  ],
                  "photo_reference": "CmRaAAAAjs5mAlLecpO7hU5ZPRRpRyfL8azuP3hkaa0nygNFUg6Mau6NkRo0ULlVwOJ6qrUDrWr__SPNYfsV3lGk0RTTKFl1NqrFW5lEdxVfh7MFLNPeCB_rQ72UTfkC4pzlMaG3EhBAWYTz-0UpSEDDwW7fIIAoGhRTmtbZ8GwPMcrQZQQS4gH4xCfH0Q",
                  "width": 4032
              }
          ],
          "place_id": "ChIJCxtUrQ8tK4gRzGY74H1wtno",
          "plus_code": {
              "compound_code": "QHMM+87 Toronto, Ontario",
              "global_code": "87M2QHMM+87"
          },
          "rating": 4.1,
          "reference": "ChIJCxtUrQ8tK4gRzGY74H1wtno",
          "scope": "GOOGLE",
          "types": [
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "5754 Yonge St, North York"
      },
      {
          "geometry": {
              "location": {
                  "lat": 43.7957618,
                  "lng": -79.41923489999999
              },
              "viewport": {
                  "northeast": {
                      "lat": 43.79709672989272,
                      "lng": -79.41800812010727
                  },
                  "southwest": {
                      "lat": 43.79439707010728,
                      "lng": -79.42070777989271
                  }
              }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          "id": "84532e410acbe0db10271c459f790abda2c665b8",
          "name": "Apkujung Restaurant",
          "opening_hours": {
              "open_now": true
          },
          "photos": [
              {
                  "height": 3024,
                  "html_attributions": [
                      "<a href=\"https://maps.google.com/maps/contrib/106343093313080728449/photos\">charles jae lee</a>"
                  ],
                  "photo_reference": "CmRaAAAANKiYTu-zNhdv6Ui_qXuO20YYF3cpn9HqGAHgAnRwI0X45_BeekEmrYdEp6mlFsKVOE9pq2p9is7EUNKp492m-5nGZapE0L_vKSpSS0bEYWbNLFCFboXwSEXd3cRPBzsmEhCTeqDYCx5D84eQsByuBAOQGhREazSgOxpW3p9wvl45KjXIWxDkYg",
                  "width": 4032
              }
          ],
          "place_id": "ChIJOZFF4f0sK4gRS-uHw4XflAc",
          "plus_code": {
              "compound_code": "QHWJ+88 Toronto, Ontario",
              "global_code": "87M2QHWJ+88"
          },
          "rating": 4,
          "reference": "ChIJOZFF4f0sK4gRS-uHw4XflAc",
          "scope": "GOOGLE",
          "types": [
              "restaurant",
              "point_of_interest",
              "food",
              "establishment"
          ],
          "vicinity": "6309 Yonge St, North York"
      }
  ],
  "status": "OK"
}

const detailMockData = {
  "html_attributions": [],
  "result": {
      "address_components": [
          {
              "long_name": "5754",
              "short_name": "5754",
              "types": [
                  "street_number"
              ]
          },
          {
              "long_name": "Yonge Street",
              "short_name": "Yonge St",
              "types": [
                  "route"
              ]
          },
          {
              "long_name": "North York",
              "short_name": "North York",
              "types": [
                  "sublocality_level_1",
                  "sublocality",
                  "political"
              ]
          },
          {
              "long_name": "Toronto",
              "short_name": "Toronto",
              "types": [
                  "locality",
                  "political"
              ]
          },
          {
              "long_name": "Toronto Division",
              "short_name": "Toronto Division",
              "types": [
                  "administrative_area_level_2",
                  "political"
              ]
          },
          {
              "long_name": "Ontario",
              "short_name": "ON",
              "types": [
                  "administrative_area_level_1",
                  "political"
              ]
          },
          {
              "long_name": "Canada",
              "short_name": "CA",
              "types": [
                  "country",
                  "political"
              ]
          },
          {
              "long_name": "M2M 3T6",
              "short_name": "M2M 3T6",
              "types": [
                  "postal_code"
              ]
          }
      ],
      "adr_address": "<span class=\"street-address\">5754 Yonge St</span>, <span class=\"locality\">North York</span>, <span class=\"region\">ON</span> <span class=\"postal-code\">M2M 3T6</span>, <span class=\"country-name\">Canada</span>",
      "formatted_address": "5754 Yonge St, North York, ON M2M 3T6, Canada",
      "formatted_phone_number": "(416) 222-4267",
      "geometry": {
          "location": {
              "lat": 43.7833387,
              "lng": -79.4168213
          },
          "viewport": {
              "northeast": {
                  "lat": 43.7846407802915,
                  "lng": -79.4154543197085
              },
              "southwest": {
                  "lat": 43.7819428197085,
                  "lng": -79.41815228029151
              }
          }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "d3bbe5d2ad7054d5f2584c567f9d19292aab5e07",
      "international_phone_number": "+1 416-222-4267",
      "name": "Jung Soo Nae Restaurant",
      "opening_hours": {
          "open_now": true,
          "periods": [
              {
                  "close": {
                      "day": 0,
                      "time": "2230"
                  },
                  "open": {
                      "day": 0,
                      "time": "1100"
                  }
              },
              {
                  "close": {
                      "day": 1,
                      "time": "2230"
                  },
                  "open": {
                      "day": 1,
                      "time": "1100"
                  }
              },
              {
                  "close": {
                      "day": 3,
                      "time": "2230"
                  },
                  "open": {
                      "day": 3,
                      "time": "1100"
                  }
              },
              {
                  "close": {
                      "day": 4,
                      "time": "2230"
                  },
                  "open": {
                      "day": 4,
                      "time": "1100"
                  }
              },
              {
                  "close": {
                      "day": 5,
                      "time": "2230"
                  },
                  "open": {
                      "day": 5,
                      "time": "1100"
                  }
              },
              {
                  "close": {
                      "day": 6,
                      "time": "2230"
                  },
                  "open": {
                      "day": 6,
                      "time": "1100"
                  }
              }
          ],
          "weekday_text": [
              "Monday: 11:00 AM – 10:30 PM",
              "Tuesday: Closed",
              "Wednesday: 11:00 AM – 10:30 PM",
              "Thursday: 11:00 AM – 10:30 PM",
              "Friday: 11:00 AM – 10:30 PM",
              "Saturday: 11:00 AM – 10:30 PM",
              "Sunday: 11:00 AM – 10:30 PM"
          ]
      },
      "photos": [
          {
              "height": 3024,
              "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/108451341521942537890/photos\">Eric Choi</a>"
              ],
              "photo_reference": "CmRaAAAAmlzh0PkDORv8iIoRNoCLzx_wUY1E4-gflHqrBoFNNHIueFa4cEE1Xrz2DQtxbIYsK_urPCma6EDHZ3FP0gzUiZe5YpysGS7ZhoiJIQHRruEntjx52RoLqc-i7ldWJ_VTEhAuak_vVL6vTJriw4QPoUfNGhTG8NVSbgNd4Uy5mFQE2h4KYsKkNA",
              "width": 4032
          },
          {
              "height": 3024,
              "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/105717801539979856682/photos\">SY K</a>"
              ],
              "photo_reference": "CmRaAAAADlyrDj5fbeLkConldpW3l0OEu7wpumw-0g1BPBAhKO7oWv7Y_dT5ijEf2530HPnLYEGEP-dVtHYpFBteL5iFkTvKjolxHqwKDjEDY30qjYbVqm1OF0NtIXLaktqazfdXEhDqKGY5CpvNYnJfsKGjUIsLGhQa7m1N0WNB2AFN1OXUT5X6cMdACw",
              "width": 4032
          },
          {
              "height": 3024,
              "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/108451341521942537890/photos\">Eric Choi</a>"
              ],
              "photo_reference": "CmRaAAAAqSUkDVzcqSSuNEBnvZsSfhKwFx6ZC5-WwfoxTJP3nVZp45iAEQ1PfYto4m3CKh8t4H_QZKnOQQTRkf2yKCZpsG0IaYSOAHdxDuM9mlRBnMlbsiUbJRUvXS1trAoZweONEhCpS_J-KU7OgQY38eRBxA84GhTgN7jydhROEwSfBQbGoECgtclc2Q",
              "width": 4032
          },
          {
              "height": 3024,
              "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/105717801539979856682/photos\">SY K</a>"
              ],
              "photo_reference": "CmRaAAAAuTiJ0x3dOWtKfNPgXeq14fhO7ZRmeCrrm1yzEqNhD7CO3PVCXxcJJVAMJ718JKBv-W5kaS8qUM7HRGE6EQUhLodXAb1dqu5uUfDX_dxHTmFZxVO_Sjne3bnofeGixDMYEhCMoTIj2AZtOEHXwJJ0vEV7GhT_7yajzXW4h_x6PDQAhrPDDeayeg",
              "width": 4032
          },
          {
              "height": 2976,
              "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/103218749411429074269/photos\">Pearl Jung</a>"
              ],
              "photo_reference": "CmRaAAAAY1w1g0rFeKuA454BmsudyIvDY0AEVVFTe0iqKfRpveKaqknQpPwrukW6YnxsTNs1Vj2xOo9Mr49mFidPBSexSyE3_hcD0rQktUy6c3RPj9xWtofc17RkcSHG4OmT2Fg4EhDnGjTtOg0LgdJcHwGDkhxsGhRYylVWQFkAM_I1VNpDmnKdhN7Wkw",
              "width": 2976
          },
          {
              "height": 3024,
              "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/106343093313080728449/photos\">charles jae lee</a>"
              ],
              "photo_reference": "CmRaAAAALXikoYR8hP341lsT9UZLxbJI2cQJk8UzQOkqe3uQ_w5MHSDTZYRhlWsR6Qeop7j-oXDnGuXFNNbmBkHJOcUYE20gvblu8TObKJow-9y3s0Q3mYnlYla0aU5aa8-mQODqEhBCk8y_0vfrLh5QPJ7FW0BqGhTCMGAbTfMd51CuGmUsr6iX8GjQ1A",
              "width": 4032
          },
          {
              "height": 3480,
              "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/115145554822418352313/photos\">Kelvin Ng</a>"
              ],
              "photo_reference": "CmRaAAAA33QSqaFzuKTS0BLOsOZcMJ4mXbRyC_4j4gpEWtOHt2Z6bg8SC9s4REAQpNWTzbxCdIqMmsXHH9QpIqXXOYV7oX13swq9BkeQNgg08y0Y7dVCIVKjO01lXAQQxkmvHpHGEhBfkdPbj7ypo7Ai4pxnR8PPGhSzqVYF1EXlQS9WrHp_ptZ94-5hsA",
              "width": 4640
          },
          {
              "height": 4608,
              "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/117974585443721268160/photos\">Leslie Chan</a>"
              ],
              "photo_reference": "CmRaAAAAxR-fPRLT3IqV30H3gQm2ktudPs1Xk9UKIojJw6FUenVFFGU15qQdNXys5dMnyInzHNgz9UTJKBTQGYmKIJZpxOav8-IZ926WWcbvY_ji_J2LJLRh2zYrLzBy9RaWhkYcEhAI3UY-UEws2OfNr4--Nc9-GhSB7kdp_HtCK9iuV-uTtzTxe-Qhsg",
              "width": 3456
          },
          {
              "height": 3024,
              "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/107431117693660399546/photos\">Hossain Khan</a>"
              ],
              "photo_reference": "CmRaAAAAamhkpEHxbD7U1yFEpfpJsHa3GmdrWyJN4PvxqbijVlvO2O6fvoahIU4rTXpvTjbriJucafRLtu3HvaSZx12vV6dz5iMIWBLv0dRR4BOPHOzyntiMB5H2ScfPAndGK8VcEhClL9HMODTY-WFY1pYjl7eSGhQPUAWT2VZKM8cQG59Y9x2zwjAb_Q",
              "width": 4032
          },
          {
              "height": 3120,
              "html_attributions": [
                  "<a href=\"https://maps.google.com/maps/contrib/117190312716047854159/photos\">Sally Heung</a>"
              ],
              "photo_reference": "CmRaAAAALwWPFKys_nEX3DeruJW11bMrsljt1pEOA1blcULfQ1ASwlfjBmINt4m72hzg6DQMLAe2v3XsK3o7StK9AsiMuASGLhgJoHf4Q1YtmSPKRP2Ro048fA3Zd5wNGMEHtrpPEhB_HzwXwCi4I994VXK2xoDMGhRTqock7pkhol370BNesKgtb6q5MQ",
              "width": 4160
          }
      ],
      "place_id": "ChIJCxtUrQ8tK4gRzGY74H1wtno",
      "plus_code": {
          "compound_code": "QHMM+87 Toronto, Ontario, Canada",
          "global_code": "87M2QHMM+87"
      },
      "rating": 4.1,
      "reference": "ChIJCxtUrQ8tK4gRzGY74H1wtno",
      "reviews": [
          {
              "author_name": "Catherine C. Lee",
              "author_url": "https://www.google.com/maps/contrib/103729788557410735031/reviews",
              "language": "en",
              "profile_photo_url": "https://lh3.googleusercontent.com/-hlQNXUhw-2E/AAAAAAAAAAI/AAAAAAAAAAc/vH6bjL6xrM8/s128-c0x00000000-cc-rp-mo/photo.jpg",
              "rating": 4,
              "relative_time_description": "3 weeks ago",
              "text": "I understand why this place has such a bad reputation for its service. The owner and servers seemed quite nervous when they spoke in English to the customers, and I think that's partially the reason why the non-Korean customers felt like they were aloof and rude. Their service in Korean wasn't super great either but fine.\n\nOther than the arguable service, this place is a hidden gem. This place is not hip or fancy but very authentically old-style Korean. I appreciated their choice of music as well, as they played pop music in the 70s and 80s, including old Korean songs.\n\nMost importantly, their food, was one of the most authentic I've ever tried outside Korea. I had porkbone soup (which could be better with perilla leaves and sesame powder) and raw crab meal. Raw crab meal is very difficult to find outside Korea and it's hard to make, but Jung Soo Nae does a great job.",
              "time": 1538185997
          },
          {
              "author_name": "Winnie LEe",
              "author_url": "https://www.google.com/maps/contrib/111980250012895790876/reviews",
              "language": "en",
              "profile_photo_url": "https://lh5.googleusercontent.com/-LJOzSr5tSZI/AAAAAAAAAAI/AAAAAAAAAEM/Zt8uhg5LKd0/s128-c0x00000000-cc-rp-mo/photo.jpg",
              "rating": 1,
              "relative_time_description": "a month ago",
              "text": "Ignorant service and people . If you think your day is not bad enough , you can try to visit . I was there for take out, and I paid after I ordered. I stood there by the kitchen waiting for my take out , the waiter asked me to wait by the entrance . I stood there about 20 mins thinking why this could take that long until I saw the customers who came after me got their food . That's when I went up to them and asked for my take out . Meanwhile the waitress who cash me out passed by me but she ignored me , she obviously knows I'm waiting for me food . (And my food was actually ready and was out aside without anybody handing it to me ). If I didn't walk up to them , I could be there waiting forever . I will never go back again . The first time I went there was for the pancake , it wasn't good and now knowing the people working there are rude and ignorant , there is no reason for me to go back !!!",
              "time": 1536795224
          },
          {
              "author_name": "Bosco Tung",
              "author_url": "https://www.google.com/maps/contrib/105777596543025871758/reviews",
              "language": "en",
              "profile_photo_url": "https://lh3.googleusercontent.com/-1qXOnn5JXRo/AAAAAAAAAAI/AAAAAAAAMWM/nAOcoBcsJzI/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
              "rating": 5,
              "relative_time_description": "2 months ago",
              "text": "Yessssssssssss! Been craving soy crab ever since having it in Korea. This is not \"as\" good as Pro Soy Crab was...but it comes close! A bit more family style than sashimi style, but amazing to satisfy the craving here in Toronto. Will be back again and again.",
              "time": 1533591893
          },
          {
              "author_name": "Emmitt Choi",
              "author_url": "https://www.google.com/maps/contrib/118198155568853441504/reviews",
              "language": "en",
              "profile_photo_url": "https://lh4.googleusercontent.com/-CgPgsZ0KMVw/AAAAAAAAAAI/AAAAAAAAAAA/AAN31DUdqrrEJiOa8a21C1m2Su0XB-96EQ/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
              "rating": 5,
              "relative_time_description": "2 months ago",
              "text": "Very nice korean restaurant.  It's not a big nor fancy place. However, this place is cozy and has real korean tasty food.",
              "time": 1533958476
          },
          {
              "author_name": "Warmy Fung",
              "author_url": "https://www.google.com/maps/contrib/116983125015531877486/reviews",
              "language": "en",
              "profile_photo_url": "https://lh5.googleusercontent.com/-mFTAGz6GZlY/AAAAAAAAAAI/AAAAAAAAAq4/-yrhg1ioa-w/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
              "rating": 2,
              "relative_time_description": "3 months ago",
              "text": "I give 2 stars is because of the guy who served us gave us attitude. There are so many Korean restaurants on Yonge Street, why there? Impatient and talk rude. In terms of food, nothing special and not better than others. Environment is the worst, so hot inside especially when in Summer time, you would sweat a lot as not enough AC. Not worth for me to go back.",
              "time": 1530332378
          }
      ],
      "scope": "GOOGLE",
      "types": [
          "restaurant",
          "food",
          "point_of_interest",
          "establishment"
      ],
      "url": "https://maps.google.com/?cid=8842378604323759820",
      "utc_offset": -240,
      "vicinity": "5754 Yonge Street, North York"
  },
  "status": "OK"
}

// const yelpNearByMockData = {
//     "businesses": [
//         {
//             "id": "CB8HrynUWR4Odnj-XTY-Ew",
//             "alias": "kookminhakgyo-toronto",
//             "name": "Kookminhakgyo",
//             "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/UKn9ib3LPjQ-7WJRQtKTeA/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/kookminhakgyo-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 176,
//             "categories": [
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 },
//                 {
//                     "alias": "bbq",
//                     "title": "Barbeque"
//                 }
//             ],
//             "rating": 4.5,
//             "coordinates": {
//                 "latitude": 43.78902,
//                 "longitude": -79.41831
//             },
//             "transactions": [],
//             "price": "$$",
//             "location": {
//                 "address1": "6016 yonge street",
//                 "address2": null,
//                 "address3": "",
//                 "city": "Toronto",
//                 "zip_code": "M2M 3W2",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "6016 yonge street",
//                     "Toronto, ON M2M 3W2",
//                     "Canada"
//                 ]
//             },
//             "phone": "+16473488890",
//             "display_phone": "+1 647-348-8890",
//             "distance": 958.0060873127421
//         },
//         {
//             "id": "iMoFE2g4kDG4FfKLJvk3Jw",
//             "alias": "buk-chang-dong-soon-tofu-north-york-2",
//             "name": "Buk Chang Dong Soon Tofu",
//             "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/Th8LymTA3gr7qIQtipk97w/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/buk-chang-dong-soon-tofu-north-york-2?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 315,
//             "categories": [
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 }
//             ],
//             "rating": 4,
//             "coordinates": {
//                 "latitude": 43.7770435193004,
//                 "longitude": -79.4145441055298
//             },
//             "transactions": [],
//             "price": "$",
//             "location": {
//                 "address1": "5445 Yonge Street",
//                 "address2": "",
//                 "address3": "",
//                 "city": "North York",
//                 "zip_code": "M2N 5S1",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "5445 Yonge Street",
//                     "North York, ON M2N 5S1",
//                     "Canada"
//                 ]
//             },
//             "phone": "+16474307458",
//             "display_phone": "+1 647-430-7458",
//             "distance": 422.3544692273009
//         },
//         {
//             "id": "4WW0U2mKgFYJILnWLmUwLA",
//             "alias": "lim-ga-ne-toronto-2",
//             "name": "Lim Ga Ne",
//             "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/6LI9dV5kPAPpuw1d0xsu0g/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/lim-ga-ne-toronto-2?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 124,
//             "categories": [
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 }
//             ],
//             "rating": 3.5,
//             "coordinates": {
//                 "latitude": 43.7784126,
//                 "longitude": -79.4150306
//             },
//             "transactions": [],
//             "price": "$$",
//             "location": {
//                 "address1": "5529 Yonge Street",
//                 "address2": "",
//                 "address3": "",
//                 "city": "Toronto",
//                 "zip_code": "M2N 5S1",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "5529 Yonge Street",
//                     "Toronto, ON M2N 5S1",
//                     "Canada"
//                 ]
//             },
//             "phone": "+16474352700",
//             "display_phone": "+1 647-435-2700",
//             "distance": 267.2134752907136
//         },
//         {
//             "id": "l07ctcrDMV--TYwe3uzebQ",
//             "alias": "huh-ga-ne-toronto",
//             "name": "Huh Ga Ne",
//             "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/N68MRNVf3NyYo9V9IvPBPA/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/huh-ga-ne-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 97,
//             "categories": [
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 }
//             ],
//             "rating": 3.5,
//             "coordinates": {
//                 "latitude": 43.7792767,
//                 "longitude": -79.4171614
//             },
//             "transactions": [],
//             "price": "$$",
//             "location": {
//                 "address1": "19 Finch Avenue W",
//                 "address2": "Unit A",
//                 "address3": "",
//                 "city": "Toronto",
//                 "zip_code": "M2N 7K4",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "19 Finch Avenue W",
//                     "Unit A",
//                     "Toronto, ON M2N 7K4",
//                     "Canada"
//                 ]
//             },
//             "phone": "+14169011288",
//             "display_phone": "+1 416-901-1288",
//             "distance": 295.7618857876258
//         },
//         {
//             "id": "Uq-15wDzsi6H7fImKHL0JQ",
//             "alias": "gui-toronto",
//             "name": "Gui",
//             "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/NgjxOYMdpSpoRF0tOHWpbw/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/gui-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 13,
//             "categories": [
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 },
//                 {
//                     "alias": "bbq",
//                     "title": "Barbeque"
//                 }
//             ],
//             "rating": 4,
//             "coordinates": {
//                 "latitude": 43.793208,
//                 "longitude": -79.4192262
//             },
//             "transactions": [],
//             "location": {
//                 "address1": "6174 Yonge Street",
//                 "address2": "",
//                 "address3": null,
//                 "city": "Toronto",
//                 "zip_code": "M2M 3X1",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "6174 Yonge Street",
//                     "Toronto, ON M2M 3X1",
//                     "Canada"
//                 ]
//             },
//             "phone": "+16473469292",
//             "display_phone": "+1 647-346-9292",
//             "distance": 1429.220091465116
//         },
//         {
//             "id": "4_L9bnIvY8TLDfiTBGcnRA",
//             "alias": "daldongnae-toronto",
//             "name": "Daldongnae",
//             "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/j0XCeX5o1HugL8WORRt6hA/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/daldongnae-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 156,
//             "categories": [
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 },
//                 {
//                     "alias": "bbq",
//                     "title": "Barbeque"
//                 }
//             ],
//             "rating": 4.5,
//             "coordinates": {
//                 "latitude": 43.78971,
//                 "longitude": -79.41825
//             },
//             "transactions": [],
//             "price": "$$",
//             "location": {
//                 "address1": "6034 Yonge Street",
//                 "address2": "",
//                 "address3": null,
//                 "city": "Toronto",
//                 "zip_code": "M2M 3W5",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "6034 Yonge Street",
//                     "Toronto, ON M2M 3W5",
//                     "Canada"
//                 ]
//             },
//             "phone": "+14162266034",
//             "display_phone": "+1 416-226-6034",
//             "distance": 1036.622134467376
//         },
//         {
//             "id": "jCzrbfboRc3D-9_Gr0Wm9w",
//             "alias": "songcooks-vaughan",
//             "name": "SongCook's",
//             "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/ATxRbuPZFt4LPIrmaLbi1g/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/songcooks-vaughan?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 316,
//             "categories": [
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 }
//             ],
//             "rating": 4,
//             "coordinates": {
//                 "latitude": 43.798408145864,
//                 "longitude": -79.422262644077
//             },
//             "transactions": [],
//             "price": "$$",
//             "location": {
//                 "address1": "72 Steeles Avenue W",
//                 "address2": "Unit 6",
//                 "address3": "",
//                 "city": "Vaughan",
//                 "zip_code": "L4J 1V7",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "72 Steeles Avenue W",
//                     "Unit 6",
//                     "Vaughan, ON L4J 1V7",
//                     "Canada"
//                 ]
//             },
//             "phone": "+16476788000",
//             "display_phone": "+1 647-678-8000",
//             "distance": 2053.404130308967
//         },
//         {
//             "id": "Z5L-jOexcqCXfXWTIWnYlw",
//             "alias": "jung-soo-nae-restaurant-north-york",
//             "name": "Jung Soo Nae Restaurant",
//             "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/b4oOHOzppEmCgYP2pYj78w/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/jung-soo-nae-restaurant-north-york?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 46,
//             "categories": [
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 }
//             ],
//             "rating": 3.5,
//             "coordinates": {
//                 "latitude": 43.78331,
//                 "longitude": -79.41696
//             },
//             "transactions": [],
//             "price": "$$",
//             "location": {
//                 "address1": "5754 Yonge Street",
//                 "address2": "",
//                 "address3": "",
//                 "city": "North York",
//                 "zip_code": "M2M 3T6",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "5754 Yonge Street",
//                     "North York, ON M2M 3T6",
//                     "Canada"
//                 ]
//             },
//             "phone": "+14162224267",
//             "display_phone": "+1 416-222-4267",
//             "distance": 341.98452505470493
//         },
//         {
//             "id": "efOtTiIqTvLijm3kIYgqPQ",
//             "alias": "chowon-family-restaurant-north-york",
//             "name": "Chowon Family Restaurant",
//             "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/oQAHNXw5qUm8C8Sf8m4XVg/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/chowon-family-restaurant-north-york?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 74,
//             "categories": [
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 }
//             ],
//             "rating": 3.5,
//             "coordinates": {
//                 "latitude": 43.78665,
//                 "longitude": -79.4185399
//             },
//             "transactions": [],
//             "price": "$$",
//             "location": {
//                 "address1": "17 Drewry Avenue",
//                 "address2": "",
//                 "address3": "",
//                 "city": "North York",
//                 "zip_code": "M2M 1C9",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "17 Drewry Avenue",
//                     "North York, ON M2M 1C9",
//                     "Canada"
//                 ]
//             },
//             "phone": "+14162507422",
//             "display_phone": "+1 416-250-7422",
//             "distance": 718.3758816046218
//         },
//         {
//             "id": "LHMPtp-2fsjSsxrLxtLeXA",
//             "alias": "oh-geul-boh-geul-restaurant-north-york",
//             "name": "Oh Geul Boh Geul Restaurant",
//             "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/NgiZtj3cVX26g564bDHc-A/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/oh-geul-boh-geul-restaurant-north-york?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 142,
//             "categories": [
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 }
//             ],
//             "rating": 3.5,
//             "coordinates": {
//                 "latitude": 43.7731359,
//                 "longitude": -79.4140716
//             },
//             "transactions": [],
//             "price": "$$",
//             "location": {
//                 "address1": "5320 Yonge St",
//                 "address2": "",
//                 "address3": "",
//                 "city": "North York",
//                 "zip_code": "M2N 5P9",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "5320 Yonge St",
//                     "North York, ON M2N 5P9",
//                     "Canada"
//                 ]
//             },
//             "phone": "+14167333385",
//             "display_phone": "+1 416-733-3385",
//             "distance": 854.9266598757679
//         },
//         {
//             "id": "Y1jrsVAWK1bFC_s1CJmICw",
//             "alias": "go-topoki-toronto",
//             "name": "Go Topoki",
//             "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/C23WTmGGLmP98-pz1aWZJQ/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/go-topoki-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 90,
//             "categories": [
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 }
//             ],
//             "rating": 4,
//             "coordinates": {
//                 "latitude": 43.7748838434756,
//                 "longitude": -79.4140006773849
//             },
//             "transactions": [],
//             "price": "$$",
//             "location": {
//                 "address1": "5 Northtown Way",
//                 "address2": "Unit 5",
//                 "address3": "",
//                 "city": "Toronto",
//                 "zip_code": "M2N 7A1",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "5 Northtown Way",
//                     "Unit 5",
//                     "Toronto, ON M2N 7A1",
//                     "Canada"
//                 ]
//             },
//             "phone": "+14165512162",
//             "display_phone": "+1 416-551-2162",
//             "distance": 662.9934696048854
//         },
//         {
//             "id": "v-z5Tw5ds2sEvtk3Kj5x4w",
//             "alias": "yupdduk-toronto",
//             "name": "Yupdduk",
//             "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/FuEtLb18OBwXtrYUx4BrRw/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/yupdduk-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 29,
//             "categories": [
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 }
//             ],
//             "rating": 3,
//             "coordinates": {
//                 "latitude": 43.77942,
//                 "longitude": -79.41759
//             },
//             "transactions": [],
//             "price": "$$",
//             "location": {
//                 "address1": "24-30 Finch Avenue W",
//                 "address2": "",
//                 "address3": "",
//                 "city": "Toronto",
//                 "zip_code": "M2N",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "24-30 Finch Avenue W",
//                     "Toronto, ON M2N",
//                     "Canada"
//                 ]
//             },
//             "phone": "",
//             "display_phone": "",
//             "distance": 306.40119523703675
//         },
//         {
//             "id": "khOsPUxJuf5R3cmgiZnk6g",
//             "alias": "mr-chu-toronto",
//             "name": "Mr Chu",
//             "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/RYSeQWTiPySsq-1JGb6m1w/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/mr-chu-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 105,
//             "categories": [
//                 {
//                     "alias": "desserts",
//                     "title": "Desserts"
//                 },
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 }
//             ],
//             "rating": 4.5,
//             "coordinates": {
//                 "latitude": 43.7792132602969,
//                 "longitude": -79.4170891866088
//             },
//             "transactions": [],
//             "price": "$",
//             "location": {
//                 "address1": "15B Finch Avenue W",
//                 "address2": "",
//                 "address3": null,
//                 "city": "Toronto",
//                 "zip_code": "M2N 7K4",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "15B Finch Avenue W",
//                     "Toronto, ON M2N 7K4",
//                     "Canada"
//                 ]
//             },
//             "phone": "+16472411889",
//             "display_phone": "+1 647-241-1889",
//             "distance": 282.8888816861839
//         },
//         {
//             "id": "tu_bhkTGMkieJeOH3uQVHQ",
//             "alias": "nak-won-north-york",
//             "name": "Nak Won",
//             "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/6rW0OK6F8XC-ApEgG37WOQ/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/nak-won-north-york?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 151,
//             "categories": [
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 }
//             ],
//             "rating": 3,
//             "coordinates": {
//                 "latitude": 43.7793859,
//                 "longitude": -79.4156465
//             },
//             "transactions": [],
//             "price": "$$",
//             "location": {
//                 "address1": "5594 Yonge Street",
//                 "address2": "",
//                 "address3": null,
//                 "city": "North York",
//                 "zip_code": "M2N 5S4",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "5594 Yonge Street",
//                     "North York, ON M2N 5S4",
//                     "Canada"
//                 ]
//             },
//             "phone": "+14165901435",
//             "display_phone": "+1 416-590-1435",
//             "distance": 197.89038366111134
//         },
//         {
//             "id": "IikkB8j2E-1QmujRsPh5wQ",
//             "alias": "kayagum-toronto",
//             "name": "Kayagum",
//             "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/pIkLDjc95YHVNSRMNrypgw/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/kayagum-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 118,
//             "categories": [
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 }
//             ],
//             "rating": 3,
//             "coordinates": {
//                 "latitude": 43.77738436969,
//                 "longitude": -79.415295124054
//             },
//             "transactions": [],
//             "price": "$$",
//             "location": {
//                 "address1": "5460 Yonge Street",
//                 "address2": "",
//                 "address3": "",
//                 "city": "Toronto",
//                 "zip_code": "M2N 6K7",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "5460 Yonge Street",
//                     "Toronto, ON M2N 6K7",
//                     "Canada"
//                 ]
//             },
//             "phone": "+16473408086",
//             "display_phone": "+1 647-340-8086",
//             "distance": 391.2089557539044
//         },
//         {
//             "id": "VC_67dpNS6bDk7qE47Atsg",
//             "alias": "drunken-chicken-toronto-2",
//             "name": "Drunken Chicken",
//             "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/SoqQ_-hiETqLkUOtDIlSjw/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/drunken-chicken-toronto-2?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 15,
//             "categories": [
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 }
//             ],
//             "rating": 4.5,
//             "coordinates": {
//                 "latitude": 43.79058,
//                 "longitude": -79.4185399
//             },
//             "transactions": [],
//             "location": {
//                 "address1": "6070 Yonge Street",
//                 "address2": "",
//                 "address3": "",
//                 "city": "Toronto",
//                 "zip_code": "M2M 3W6",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "6070 Yonge Street",
//                     "Toronto, ON M2M 3W6",
//                     "Canada"
//                 ]
//             },
//             "phone": "+14165120488",
//             "display_phone": "+1 416-512-0488",
//             "distance": 1068.6458127322203
//         },
//         {
//             "id": "FQzSV_tUK7XG-bAoJ9sRSA",
//             "alias": "pujukan-toronto",
//             "name": "Pujukan",
//             "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/9W2PU7niNMZBSxURyNF3Pg/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/pujukan-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 13,
//             "categories": [
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 },
//                 {
//                     "alias": "bbq",
//                     "title": "Barbeque"
//                 }
//             ],
//             "rating": 4,
//             "coordinates": {
//                 "latitude": 43.76262,
//                 "longitude": -79.41152
//             },
//             "transactions": [],
//             "location": {
//                 "address1": "4852 Yonge Street",
//                 "address2": "",
//                 "address3": null,
//                 "city": "Toronto",
//                 "zip_code": "M2N 5N2",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "4852 Yonge Street",
//                     "Toronto, ON M2N 5N2",
//                     "Canada"
//                 ]
//             },
//             "phone": "+14168400589",
//             "display_phone": "+1 416-840-0589",
//             "distance": 2037.0484896438263
//         },
//         {
//             "id": "EO3i5kTUG7_S2OIQ23sdSA",
//             "alias": "mot-na-son-restaurant-north-york",
//             "name": "Mot Na Son Restaurant",
//             "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/H5O5Elg-2Tk9BWyBN7kocA/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/mot-na-son-restaurant-north-york?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 42,
//             "categories": [
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 }
//             ],
//             "rating": 3.5,
//             "coordinates": {
//                 "latitude": 43.7745839,
//                 "longitude": -79.4144356
//             },
//             "transactions": [],
//             "price": "$$",
//             "location": {
//                 "address1": "5374 Yonge St",
//                 "address2": "",
//                 "address3": "",
//                 "city": "North York",
//                 "zip_code": "M2N 5R5",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "5374 Yonge St",
//                     "North York, ON M2N 5R5",
//                     "Canada"
//                 ]
//             },
//             "phone": "+14162221170",
//             "display_phone": "+1 416-222-1170",
//             "distance": 711.3161272586442
//         },
//         {
//             "id": "Yk-M1qkLN_QNHUhxBtO4bw",
//             "alias": "roll-toronto",
//             "name": "Roll",
//             "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/Cm-QIP6Zexwt5Evio9JbNQ/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/roll-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 30,
//             "categories": [
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 }
//             ],
//             "rating": 4,
//             "coordinates": {
//                 "latitude": 43.77511,
//                 "longitude": -79.41379
//             },
//             "transactions": [],
//             "price": "$",
//             "location": {
//                 "address1": "5 Northtown Way",
//                 "address2": "Unit 10",
//                 "address3": "",
//                 "city": "Toronto",
//                 "zip_code": "M2N 7A1",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "5 Northtown Way",
//                     "Unit 10",
//                     "Toronto, ON M2N 7A1",
//                     "Canada"
//                 ]
//             },
//             "phone": "+14165128788",
//             "display_phone": "+1 416-512-8788",
//             "distance": 674.8094744581065
//         },
//         {
//             "id": "KxcQs2Lkm3FJiltVWXOz_Q",
//             "alias": "hashi-izakaya-toronto",
//             "name": "Hashi Izakaya",
//             "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/sHkdGGApu33hlcKs-sN_XA/o.jpg",
//             "is_closed": false,
//             "url": "https://www.yelp.com/biz/hashi-izakaya-toronto?adjust_creative=7KX1N6fXhVTvdtFcT25K5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=7KX1N6fXhVTvdtFcT25K5w",
//             "review_count": 51,
//             "categories": [
//                 {
//                     "alias": "japanese",
//                     "title": "Japanese"
//                 },
//                 {
//                     "alias": "korean",
//                     "title": "Korean"
//                 },
//                 {
//                     "alias": "bars",
//                     "title": "Bars"
//                 }
//             ],
//             "rating": 3.5,
//             "coordinates": {
//                 "latitude": 43.779256,
//                 "longitude": -79.415713
//             },
//             "transactions": [],
//             "price": "$$",
//             "location": {
//                 "address1": "5582 Yonge Street",
//                 "address2": "",
//                 "address3": "",
//                 "city": "Toronto",
//                 "zip_code": "M2N 5S2",
//                 "country": "CA",
//                 "state": "ON",
//                 "display_address": [
//                     "5582 Yonge Street",
//                     "Toronto, ON M2N 5S2",
//                     "Canada"
//                 ]
//             },
//             "phone": "+14162248179",
//             "display_phone": "+1 416-224-8179",
//             "distance": 206.09538812465075
//         }
//     ],
//     "total": 92,
//     "region": {
//         "center": {
//             "longitude": -79.41438,
//             "latitude": 43.78084
//         }
//     }
// }

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
//   const key = 'ChIJCxtUrQ8tK4gRzGY74H1wtno'; // key of the restaurant. right now, it is hardcoded but later, it will be coming from front end
//   const endpoint = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${key}&key=${placeApiKey}`;

//   try {
//     const data = await axios.get(endpoint);

//     return res.json(data.data);

//   } catch (e) {
//     return res.status(404).json({
//       success: false,
//       msg: e.message
//     });
//   }
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
    const data = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${yelpApiKey}`}
    });

    return res.json(data.data.businesses);

  } catch (e) {
    return res.status(404).json({
      success: false,
      msg: e.message
    });
  }
}
