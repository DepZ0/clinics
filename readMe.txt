We have 5 main routs and 1 route for serch by slug (as id).


We need GET request to get list of clinics.
So, main routes: - GET -
["city", "state", "postcode", "clinicName", "suburb"]

API takes query "searchBy" and "value".
    'searchBy - at here we point 1 of main routes';
    'value - at here we point FULL NAME of city/state/postcode/clinicName/suburb'

Our request may be as this - /clinics?searchBy=city&value=Sydney&page=5
In this project we have pagination - 10 object on page.

---

When we maked request as upper, we get answer with some info about clinics
and in taken list from answer we have 'slug'. Use this rout to get clinic as id.
    Server's anser like this: 
    {...,
    ...,
    "slug": "/clinic/movement-101-botany"
    }

Use route from "slug" like this - /clinic/movement-101-botany