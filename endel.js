var aleoo = JSON.parse($response.body);

aleoo["subscription"]= {
    "time_left" : 0,
    "trial_type" : "CALENDAR_BASED",
    "price_id" : "",
    "period" : "NOPERIOD",
    "cancel_at_period_end" : false,
    "valid_until" : 4070937600, 
    "type" : "ACTIVE",
    "store" : "NOSTORE"
};

$done({body: JSON.stringify(aleoo)});
