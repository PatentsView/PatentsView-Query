[
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Patent Number",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "patent_number",
    "searchGroup": "patent",
    "desc": "US Patent number, as assigned by USPTO"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Patent Title",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "full text",
    "id": "patent_title",
    "searchGroup": "patent",
    "desc": "Title of the  patent"
  },
  {
    "isQuery": "false",
    "group": "applications",
    "name": "Patent Abstract",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "full text",
    "id": "patent_abstract",
    "searchGroup": "patent",
    "desc": "Abstract of the patent"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Patent Grant Date",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "patent_date",
    "searchGroup": "patent",
    "desc": "Date patent was granted"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Patent Year",
    "entities": [
      "patent"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "integer",
    "id": "patent_year",
    "searchGroup": "patent",
    "desc": "Year patent was granted"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Patent Kind",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "A",
      "E",
      "S",
      "I5",
      "P",
      "B1",
      "B2",
      "S1",
      "H",
      "H1",
      "H2",
      "P2",
      "P3",
      "E1",
      "I4"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "patent_kind",
    "searchGroup": "patent",
    "desc": "World Intellectual Property Organization (WIPO) Standard ST.16 Patent Code (http://www.uspto.gov/learning-and-resources/support-centers/electronic-business-center/kind-codes-included-uspto-patent)"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Patent Type",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "Defensive Publication",
      "Design",
      "Plant",
      "Reissue",
      "Statutory Invention Registration",
      "TVPP",
      "Utility"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "patent_type",
    "searchGroup": "patent",
    "desc": "Category of patent. There are 6 possible type: \"Defensive Publication\" - 509, \"Design\" - 474736, \"Plant\" - 21052, \"Reissue\" - 16416, \"Statutory Invention Registration\" - 2254, \"Utility\" - 4910906."
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Patent Average Processing Time",
    "entities": [
      "patent"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "integer",
    "id": "patent_average_processing_time",
    "searchGroup": "patent",
    "desc": "Average processing time for patents in the same USPC mainclass category as the selected patent"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Patent Processing Time",
    "entities": [
      "patent"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "integer",
    "id": "patent_processing_time",
    "searchGroup": "patent",
    "desc": "Time from filing application date to grant date for the patent"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Application Number",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "app_number",
    "searchGroup": "patent",
    "desc": "Application ID assigned by USPTO"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Application Filing Date",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "app_date",
    "searchGroup": "patent",
    "desc": "Date the patent application was filed (filing date)"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Application Type",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "29",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "D"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "app_type",
    "searchGroup": "patent",
    "desc": "Patent Application Type (From XML data dictionary). 02 through 28 = Utility application; 29, D = Design application; 60 = Provisional application; 90 = Reexamination request"
  },
  {
    "isQuery": "false",
    "group": "applications",
    "name": "Government Organization ID",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "integer",
    "id": "govint_org_id",
    "searchGroup": "patent",
    "desc": "Organization ID of the U.S. government agency reported in the government interest statement on patents (if available)"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Government Organization Name",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "govint_org_name",
    "searchGroup": "patent",
    "desc": "Name of the U.S. government organization reported in the government interest statement on patents (if available)."
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Top Level Government Organization",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "govint_org_level_one",
    "searchGroup": "patent",
    "desc": "The top-level U.S. government organization name related to the organization reported in the government interest statement on patents (if available). For example, the National Institutes of Health report to the U.S. Department of Health and Human Services."
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Second Level Government Organization",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "govint_org_level_two",
    "searchGroup": "patent",
    "desc": "The second-level U.S. government organization name related to the organization reported in the government interest statement on patents (if available). For example, the National Institutes of Health is second-level in relation to the National Heart, Lung, and Blood Institute."
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Third Level Government Organization",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "govint_org_level_three",
    "searchGroup": "patent",
    "desc": "The third-level U.S. government organization name related to the organization reported in the government interest statement on patents (if available). For example, the National Institute for Occupational Safety and Health is third-level in relation to the Centers for Disease Control and Prevention that report to the U.S. Department of Health and Human Services."
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Government Contract/Award Number",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "integer",
    "id": "govint_contract_award_number",
    "searchGroup": "patent",
    "desc": "Contract or award number as reported in the government interest statement on patents (if available)"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Government Interest Statement",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "full text",
    "id": "govint_raw_statement",
    "searchGroup": "patent",
    "desc": "The full government interest statement as reported on a given patent (if available)."
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee City At Issue",
    "entities": [
      "patent",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "assignee_city",
    "searchGroup": "assignee",
    "desc": "Assignee's city as listed on the patent"
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee City At Issue",
    "entities": [
      "assignee"
    ],
    "values": [
      "city",
      "state",
      "country"
    ],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "location_city",
    "searchGroup": "assignee",
    "desc": "Assignee's city as listed on the patent"
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee Country At Issue",
    "entities": [
      "patent",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "assignee_country",
    "searchGroup": "assignee",
    "desc": "Assignee's country as listed on the patent"
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee Country At Issue",
    "entities": [
      "assignee"
    ],
    "values": [
      "city",
      "state",
      "country"
    ],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "location_country",
    "searchGroup": "assignee",
    "desc": "Assignee's country as listed on the patent"
  },
  {
    "isQuery": "true",
    "group": "assignees",
    "name": "Assignee First Name",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "assignee_first_name",
    "searchGroup": "assignee",
    "desc": "First name, if assignee is individual"
  },
  {
    "isQuery": "true",
    "group": "assignees",
    "name": "Assignee First Seen Date",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "assignee_first_seen_date",
    "searchGroup": "assignee",
    "desc": "Earliest patent grant date for all of an asisgnee's patents in the database"
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee ID",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "assignee_id",
    "searchGroup": "assignee",
    "desc": "Unique database assignee ID assigned by disambiguation algorithm"
  },
  {
    "isQuery": "true",
    "group": "assignees",
    "name": "Assignee Last Known Location",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "false",
    "type": "location",
    "id": "assignee_lastknown_location",
    "searchGroup": "assignee",
    "desc": "Assignee's last known location."
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee Last Known City",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "assignee_lastknown_city",
    "searchGroup": "assignee",
    "desc": "Assignee's city as of their most recent patent grant date (equivalently, as of assignee_last_seen_date)"
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee Last Known Country",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "assignee_lastknown_country",
    "searchGroup": "assignee",
    "desc": "Assignee's country as of their most recent patent grant date (equivalently, as of assignee_last_seen_date)"
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee Last Known Latitude",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "float",
    "id": "assignee_lastknown_latitude",
    "searchGroup": "assignee",
    "desc": "Latitude for assignee's location as of their most recent patent grant date (equivalently, as of assignee_last_seen_date)"
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee Last Known Location ID",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "city",
      "state",
      "country"
    ],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "assignee_lastknown_location_id",
    "searchGroup": "assignee",
    "desc": "Unique database ID for the assignee's location on their most recent patent grant date (equivalently, as of assignee_last_seen_date)"
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee Last Known Longitude",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "float",
    "id": "assignee_lastknown_longitude",
    "searchGroup": "assignee",
    "desc": "Longitude for assignee's location as of their most recent patent grant date (equivalently, as of assignee_last_seen_date)"
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee Last Known State",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "assignee_lastknown_state",
    "searchGroup": "assignee",
    "desc": "Assignee's state as of their most recent patent grant date (equivalently, as of assignee_last_seen_date)"
  },
  {
    "isQuery": "true",
    "group": "assignees",
    "name": "Assignee Last Name",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "assignee_last_name",
    "searchGroup": "assignee",
    "desc": "Last name, if assignee is individual"
  },
  {
    "isQuery": "true",
    "group": "assignees",
    "name": "Assignee Last Seen Date",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "assignee_last_seen_date",
    "searchGroup": "assignee",
    "desc": "Most recent patent grant date for all of the asisgnee's patents in the database"
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee Latitude At Issue",
    "entities": [
      "patent",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "float",
    "id": "assignee_latitude",
    "searchGroup": "assignee",
    "desc": "Latitude for assignee's location as listed on the patent"
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee Latitude At Issue",
    "entities": [
      "assignee"
    ],
    "values": [
      "city",
      "state",
      "country"
    ],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "float",
    "id": "location_latitude",
    "searchGroup": "assignee",
    "desc": "Latitude for assignee's location as listed on the patent"
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee Location ID At Issue",
    "entities": [
      "patent",
      "inventor"
    ],
    "values": [
      "city",
      "state",
      "country"
    ],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "assignee_location_id",
    "searchGroup": "assignee",
    "desc": "Unique database ID for the assignee's location as listed on the patent"
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee Location ID At Issue",
    "entities": [
      "assignee"
    ],
    "values": [
      "city",
      "state",
      "country"
    ],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "location_id",
    "searchGroup": "assignee",
    "desc": "Unique database ID for the assignee's location as listed on the patent"
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee Longitude At Issue",
    "entities": [
      "patent",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "float",
    "id": "assignee_longitude",
    "searchGroup": "assignee",
    "desc": "Longitude for assignee's location a listed on the patent"
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee Longitude At Issue",
    "entities": [
      "assignee"
    ],
    "values": [
      "city",
      "state",
      "country"
    ],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "float",
    "id": "location_longitude",
    "searchGroup": "assignee",
    "desc": "Longitude for assignee's location a listed on the patent"
  },
  {
    "isQuery": "true",
    "group": "assignees",
    "name": "Assignee Organization",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "assignee_organization",
    "searchGroup": "assignee",
    "desc": "Organization name, if assignee is organization"
  },
  {
    "isQuery": "true",
    "group": "assignees",
    "name": "Assignee Location At Issue",
    "entities": [
      "assignee"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "false",
    "type": "location",
    "id": "location_location",
    "searchGroup": "assignee",
    "desc": "Assignee's location as listed on the patent"
  },
  {
    "isQuery": "true",
    "group": "assignees",
    "name": "Assignee Location At Issue",
    "entities": [
      "patent",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "false",
    "type": "location",
    "id": "assignee_location",
    "searchGroup": "assignee",
    "desc": "Assignee's location as listed on the patent"
  },
  {
    "isQuery": "true",
    "group": "assignees",
    "name": "Assignee Sequence On Patent",
    "entities": [
      "patent"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "integer",
    "id": "assignee_sequence",
    "searchGroup": "assignee",
    "desc": "Order in which assignee appears on the patent"
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee State At Issue",
    "entities": [
      "patent",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "assignee_state",
    "searchGroup": "assignee",
    "desc": "Assignee's state as listed on the patent"
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Assignee State At Issue",
    "entities": [
      "assignee"
    ],
    "values": [
      "city",
      "state",
      "country"
    ],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "location_state",
    "searchGroup": "assignee",
    "desc": "Assignee's state as listed on the patent"
  },
  {
    "isQuery": "true",
    "group": "assignees",
    "name": "Assignee Type",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "3",
      "2",
      "5",
      "4",
      "13",
      "7",
      "6",
      "14",
      "15",
      "12",
      "9",
      "8",
      "1"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "assignee_type",
    "searchGroup": "assignee",
    "desc": "Classification of assignee. 2 - US Company or Corporation, 3 - Foreign Company or Corporation, 4 - US Individual, 5 - Foreign Individual, 6 - US Government, 7 - Foreign Government, 8 - Country Government, 9 - State Government (US). Note: A \"1\" appearing before any of these codes signifies part interest"
  },
  {
    "isQuery": "true",
    "group": "application_citations",
    "name": "Cited Application Category",
    "entities": [
      "patent"
    ],
    "values": [
      "cited by examiner",
      "cited by applicant",
      "cited by other",
      "cited by third party"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "appcit_category",
    "searchGroup": "application_citations",
    "desc": "Entity that cited an application in the selected patent"
  },
  {
    "isQuery": "true",
    "group": "application_citations",
    "name": "Cited Application Filing Date",
    "entities": [
      "patent"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "appcit_date",
    "searchGroup": "application_citations",
    "desc": "Filing date for application cited in the selected patent"
  },
  {
    "isQuery": "true",
    "group": "application_citations",
    "name": "Cited Application Kind",
    "entities": [
      "patent"
    ],
    "values": [
      "A1",
      "A2",
      "A9",
      "A",
      "S",
      "A3",
      "B1",
      "P1",
      "T2",
      "U1",
      "A5",
      "C1",
      "C2",
      "B2",
      "B3",
      "C",
      "E1",
      "B",
      "U",
      "I5",
      "E"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "appcit_kind",
    "searchGroup": "application_citations",
    "desc": "Patent kind of application cited by patent"
  },
  {
    "isQuery": "true",
    "group": "application_citations",
    "name": "Cited Application Number",
    "entities": [
      "patent"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "appcit_app_number",
    "searchGroup": "application_citations",
    "desc": "Application ID (issued by USPTO) for application cited by the selected patent"
  },
  {
    "isQuery": "false",
    "group": "application_citations",
    "name": "Cited Application Sequence On Patent",
    "entities": [
      "patent"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "integer",
    "id": "appcit_sequence",
    "searchGroup": "application_citations",
    "desc": "Order in which a citation is cited by patent"
  },
  {
    "isQuery": "true",
    "group": "cited_patents",
    "name": "Cited Patent Number",
    "entities": [
      "patent"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "cited_patent_number",
    "searchGroup": "cited_patents",
    "desc": "Patent number of cited patent"
  },
  {
    "isQuery": "true",
    "group": "cited_patents",
    "name": "Cited Patent Title",
    "entities": [
      "patent"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "cited_patent_title",
    "searchGroup": "cited_patents",
    "desc": "Title of cited patent"
  },
  {
    "isQuery": "true",
    "group": "cited_patents",
    "name": "Cited Patent Date",
    "entities": [
      "patent"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "cited_patent_date",
    "searchGroup": "cited_patents",
    "desc": "Grant data of cited patent"
  },
  {
    "isQuery": "true",
    "group": "cited_patents",
    "name": "Cited Patent Kind",
    "entities": [
      "patent"
    ],
    "values": [
      "A",
      "E",
      "S",
      "I5",
      "P",
      "B1",
      "B2",
      "S1",
      "H",
      "H1",
      "H2",
      "P2",
      "P3",
      "E1",
      "I4"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "cited_patent_kind",
    "searchGroup": "cited_patents",
    "desc": "Patent kind of cited patent  (see patent_kind for details)"
  },
  {
    "isQuery": "true",
    "group": "cited_patents",
    "name": "Cited Patent Category",
    "entities": [
      "patent"
    ],
    "values": [
      "cited by examiner",
      "cited by applicant",
      "cited by other",
      "cited by third party"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "cited_patent_category",
    "searchGroup": "cited_patents",
    "desc": "Category of cited patent "
  },
  {
    "isQuery": "false",
    "group": "cited_patents",
    "name": "Cited Patent Sequence On Patent",
    "entities": [
      "patent"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "cited_patent_sequence",
    "searchGroup": "cited_patents",
    "desc": "Order in which patent is cited by the selected patent"
  },
  {
    "isQuery": "true",
    "group": "citedby_patents",
    "name": "Citing Patent Number",
    "entities": [
      "patent"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "citedby_patent_number",
    "searchGroup": "citing_patents",
    "desc": "Patent number of citing patent"
  },
  {
    "isQuery": "true",
    "group": "citedby_patents",
    "name": "Citing Patent Title",
    "entities": [
      "patent"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "citedby_patent_title",
    "searchGroup": "citing_patents",
    "desc": "Title of citing patent"
  },
  {
    "isQuery": "true",
    "group": "citedby_patents",
    "name": "Citing Patent Date",
    "entities": [
      "patent"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "citedby_patent_date",
    "searchGroup": "citing_patents",
    "desc": "Grant date of patent citing the selected patent"
  },
  {
    "isQuery": "true",
    "group": "citedby_patents",
    "name": "Citing Patent Kind",
    "entities": [
      "patent"
    ],
    "values": [
      "A",
      "E",
      "S",
      "I5",
      "P",
      "B1",
      "B2",
      "S1",
      "H",
      "H1",
      "H2",
      "P2",
      "P3",
      "E1",
      "I4"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "citedby_patent_kind",
    "searchGroup": "citing_patents",
    "desc": "Patent kind of citing patent (see patent_kind for details)"
  },
  {
    "isQuery": "true",
    "group": "citedby_patents",
    "name": "Citing Patent Category",
    "entities": [
      "patent"
    ],
    "values": [
      "cited by examiner",
      "cited by applicant",
      "cited by other",
      "cited by third party"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "citedby_patent_category",
    "searchGroup": "citing_patents",
    "desc": "Category of citing patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor ID",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "inventor_id",
    "searchGroup": "inventor",
    "desc": "Unique database inventor ID  by disambiguation algorithm"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Inventor First Name",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "inventor_first_name",
    "searchGroup": "inventor",
    "desc": "First name of inventor"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Inventor Last Name",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "inventor_last_name",
    "searchGroup": "inventor",
    "desc": "Last name of inventor"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Inventor First Name Before Disambiguation",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "rawinventor_first_name",
    "searchGroup": "inventor",
    "desc": "Inventor first name before disambiguation as listed on the selected patent"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Inventor Last Name Before Disambiguation",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "rawinventor_last_name",
    "searchGroup": "inventor",
    "desc": "Inventor last name before disambiguation as listed on the selected patent"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Inventor First Seen Date",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "inventor_first_seen_date",
    "searchGroup": "inventor",
    "desc": "Earliest patent grant date for all the inventor's patents in the database"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Inventor Last Seen Date",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "inventor_last_seen_date",
    "searchGroup": "inventor",
    "desc": "Most recent patent grant date for all the inventor's patents in the database"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor Location ID At Issue",
    "entities": [
      "patent",
      "assignee"
    ],
    "values": [
      "city",
      "state",
      "country"
    ],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "inventor_location_id",
    "searchGroup": "inventor",
    "desc": "Inventor's location as listed on the selected patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor Location ID At Issue",
    "entities": [
      "inventor"
    ],
    "values": [
      "city",
      "state",
      "country"
    ],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "location_id",
    "searchGroup": "inventor",
    "desc": "Unique database ID for the inventor's location as listed on the patent"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Inventor Location At Issue",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "false",
    "type": "location",
    "id": "location_location",
    "searchGroup": "inventor",
    "desc": "Inventor's location as listed on the selected patent"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Inventor Location At Issue",
    "entities": [
      "patent",
      "assignee"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "false",
    "type": "location",
    "id": "inventor_location",
    "searchGroup": "inventor",
    "desc": "Inventor's location as listed on the selected patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor City At Issue",
    "entities": [
      "patent",
      "assignee"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "inventor_city",
    "searchGroup": "inventor",
    "desc": "Inventor's city as listed on the selected patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor City At Issue",
    "entities": [
      "inventor"
    ],
    "values": [
      "city",
      "state",
      "country"
    ],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "location_city",
    "searchGroup": "inventor",
    "desc": "Inventor's city as listed on the selected patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor State At Issue",
    "entities": [
      "patent",
      "assignee"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "inventor_state",
    "searchGroup": "inventor",
    "desc": "Inventor's state as listed on the selected patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor State At Issue",
    "entities": [
      "inventor"
    ],
    "values": [
      "city",
      "state",
      "country"
    ],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "location_state",
    "searchGroup": "inventor",
    "desc": "Inventor's state as listed on the selected patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor Country At Issue",
    "entities": [
      "patent",
      "assignee"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "inventor_country",
    "searchGroup": "inventor",
    "desc": "Inventor's country as listed on the selected patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor Country At Issue",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "location_country",
    "searchGroup": "inventor",
    "desc": "Inventor's country as listed on the selected patent"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Inventor Last Known Location",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "false",
    "type": "location",
    "id": "inventor_lastknown_location",
    "searchGroup": "inventor",
    "desc": "Inventor's location as of their most recent patent grant date (equivalently, as of inventor_last_seen_date)"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor Latitude At Issue",
    "entities": [
      "patent",
      "assignee"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "float",
    "id": "inventor_latitude",
    "searchGroup": "inventor",
    "desc": "Latitude of inventor's as listed on the selected patent patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor Latitude At Issue",
    "entities": [
      "inventor"
    ],
    "values": [
      "city",
      "state",
      "country"
    ],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "float",
    "id": "location_latitude",
    "searchGroup": "inventor",
    "desc": "Latitude of inventor's as listed on the selected patent patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor Longitude At Issue",
    "entities": [
      "patent",
      "assignee"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "float",
    "id": "inventor_longitude",
    "searchGroup": "inventor",
    "desc": "Longitude of inventor's city as listed on the selected patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor Longitude At Issue",
    "entities": [
      "inventor"
    ],
    "values": [
      "city",
      "state",
      "country"
    ],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "float",
    "id": "location_longitude",
    "searchGroup": "inventor",
    "desc": "Longitude of inventor's city as listed on the selected patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor Last Known Location",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "city",
      "state",
      "country"
    ],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "inventor_lastknown_location_id",
    "searchGroup": "inventor",
    "desc": "Inventor's location as of their most recent patent grant date (equivalently, as of inventor_last_seen_date)"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor Last Known City",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "inventor_lastknown_city",
    "searchGroup": "inventor",
    "desc": "Inventor's city as of their most recent patent grant date (equivalently, as of inventor_last_seen_date)"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor Last Known State",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "inventor_lastknown_state",
    "searchGroup": "inventor",
    "desc": "Inventor's state as of their most recent patent grant date (equivalently, as of inventor_last_seen_date)"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor Last Known Country",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "inventor_lastknown_country",
    "searchGroup": "inventor",
    "desc": "Inventor's country as of their most recent patent grant date (equivalently, as of inventor_last_seen_date)"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor Last Known Latitude",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "float",
    "id": "inventor_lastknown_latitude",
    "searchGroup": "inventor",
    "desc": "Latitude of inventor's city as of their most recent patent grant date (equivalently, as of inventor_last_seen_date)"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Inventor Last Known Longitude",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "float",
    "id": "inventor_lastknown_longitude",
    "searchGroup": "inventor",
    "desc": "Longitude of inventor's city as of their most recent patent grant date (equivalently, as of inventor_last_seen_date)"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Inventor Sequence On Patent",
    "entities": [
      "patent"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "integer",
    "id": "inventor_sequence",
    "searchGroup": "inventor",
    "desc": "Order in which inventor is listed on the patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Coinventor ID",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "coinventor_id",
    "searchGroup": "inventor",
    "desc": "Unique ID for a coinventor assigned by disambiguation algorithm"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Coinventor First Name",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "coinventor_first_name",
    "searchGroup": "inventor",
    "desc": "First name of the coinventor"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Coinventor Last Name",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "coinventor_last_name",
    "searchGroup": "inventor",
    "desc": "Last name of the coinventor"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Coinventor First Seen Date",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "coinventor_first_seen_date",
    "searchGroup": "inventor",
    "desc": "Grant date of coinventor's earliest patent"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Coinventor Last Seen Date",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "coinventor_last_seen_date",
    "searchGroup": "inventor",
    "desc": "Grant date of coinventor's most recent patent in the database"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Coinventor Location ID At Issue",
    "entities": [
      "inventor"
    ],
    "values": [
      "city",
      "state",
      "country"
    ],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "coinventor_location_id",
    "searchGroup": "inventor",
    "desc": "Coinventor's location as listed on the patent"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Coinventor Location At Issue",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "false",
    "type": "location",
    "id": "coinventor_location",
    "searchGroup": "inventor",
    "desc": "Coinventor's location as listed on the patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Coinventor City At Issue",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "coinventor_city",
    "searchGroup": "inventor",
    "desc": "Coinventor's city as listed on the patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Coinventor State At Issue",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "coinventor_state",
    "searchGroup": "inventor",
    "desc": "Coinventor's state as listed on the selected patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Coinventor Country At Issue",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "coinventor_country",
    "searchGroup": "inventor",
    "desc": "Coinventor's country as listed on the patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Coinventor Latitude At Issue",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "float",
    "id": "coinventor_latitude",
    "searchGroup": "inventor",
    "desc": "Latitude of coinventor's city as listed on the selected patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Coinventor Longitude At Issue",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "float",
    "id": "coinventor_longitude",
    "searchGroup": "inventor",
    "desc": "Longitude of coinventor's city as lited on the selected patent"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Coinventor Last Known Location ID",
    "entities": [
      "inventor"
    ],
    "values": [
      "city",
      "state",
      "country"
    ],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "coinventor_lastknown_location_id",
    "searchGroup": "inventor",
    "desc": "Coinventor's location as of their most recent patent grant date (equivalently, as of coinventor_last_seen_date)"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Coinventor Last Known Location",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "false",
    "type": "location",
    "id": "coinventor_lastknown_location",
    "searchGroup": "inventor",
    "desc": "Coinventor's location as of their most recent patent grant date (equivalently, as of coinventor_last_seen_date)"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Coinventor Last Known City",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "coinventor_lastknown_city",
    "searchGroup": "inventor",
    "desc": "Coinventor's city as of their most recent patent grant date (equivalently, as of coinventor_last_seen_date)"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Coinventor Last Known State",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "coinventor_lastknown_state",
    "searchGroup": "inventor",
    "desc": "Coinventor's state as of their most recent patent grant date (equivalently, as of coinventor_last_seen_date)"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Coinventor Last Known Country",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "coinventor_lastknown_country",
    "searchGroup": "inventor",
    "desc": "Coinventor's country as of their most recent patent grant date (equivalently, as of coinventor_last_seen_date)"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Coinventor Last Known Latitude",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "float",
    "id": "coinventor_lastknown_latitude",
    "searchGroup": "inventor",
    "desc": "Latitude of coinventor's city as of their most recent patent grant date (equivalently, as of coinventor_last_seen_date)"
  },
  {
    "isQuery": "false",
    "group": "inventors",
    "name": "Coinventor Last Known Longitude",
    "entities": [
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "float",
    "id": "coinventor_lastknown_longitude",
    "searchGroup": "inventor",
    "desc": "Longitude of coinventor's city as of their most recent patent grant date (equivalently, as of coinventor_last_seen_date)"
  },
  {
    "isQuery": "false",
    "group": "cpcs",
    "name": "CPC Section ID",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "G",
      "F",
      "B",
      "H",
      "C",
      "Y",
      "A",
      "E",
      "D"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "cpc_section_id",
    "searchGroup": "cpc",
    "desc": "CPC section ID (A = Human Necessitites, B = Performing Operations; Transporint, C = Chemistry; Metallurgy, D = Textiles; paper, E = Fixed Constructing, F = Mechanical Engineering; Lighting; Heating; Weapons; Blasting Engines; Pumps, G = Physics, H = Electricity, Y = General Tagging of new technological developments)"
  },
  {
    "isQuery": "false",
    "group": "cpcs",
    "name": "CPC Subsection ID",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "cpc_subsection_id",
    "searchGroup": "cpc",
    "desc": "CPC subsection ID"
  },
  {
    "isQuery": "false",
    "group": "cpcs",
    "name": "CPC Group ID",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "cpc_group_id",
    "searchGroup": "cpc",
    "desc": "CPC group ID"
  },
  {
    "isQuery": "false",
    "group": "cpcs",
    "name": "CPC Subgroup ID",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "cpc_subgroup_id",
    "searchGroup": "cpc",
    "desc": "CPC subgroup ID"
  },
  {
    "isQuery": "true",
    "group": "cpcs",
    "name": "CPC Category",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "invention",
      "additional"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "cpc_category",
    "searchGroup": "cpc",
    "desc": "Top Level Cooperative Patent Classification (CPC) category (http://www.cooperativepatentclassification.org/index.html)"
  },
  {
    "isQuery": "true",
    "group": "cpcs",
    "name": "CPC Subsection Title",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "cpc_subsection_title",
    "searchGroup": "cpc",
    "desc": "Description of CPC subsection"
  },
  {
    "isQuery": "true",
    "group": "cpcs",
    "name": "CPC Group Title",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "cpc_group_title",
    "searchGroup": "cpc",
    "desc": "Description of CPC group"
  },
  {
    "isQuery": "true",
    "group": "cpcs",
    "name": "CPC Class",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "cpc_section_id",
      "cpc_subsection_id",
      "cpc_group_id",
      "cpc_subgroup_id"
    ],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "false",
    "type": "cpc",
    "id": "cpc_class",
    "searchGroup": "cpc",
    "desc": ""
  },
  {
    "isQuery": "true",
    "group": "cpcs",
    "name": "CPC Subgroup Title",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "cpc_subgroup_title",
    "searchGroup": "cpc",
    "desc": "Description of CPC subgroup"
  },
  {
    "isQuery": "true",
    "group": "cpcs",
    "name": "CPC First Seen Date",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "cpc_first_seen_date",
    "searchGroup": "cpc",
    "desc": "Grant date of the earliest patent in the database within a CPC subsection."
  },
  {
    "isQuery": "true",
    "group": "cpcs",
    "name": "CPC Last Seen Date",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "cpc_last_seen_date",
    "searchGroup": "cpc",
    "desc": "Grant date of the most recent patent in the database within a CPC subsection"
  },
  {
    "isQuery": "true",
    "group": "cpcs",
    "name": "CPC Sequence On Patent",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "integer",
    "id": "cpc_sequence",
    "searchGroup": "cpc",
    "desc": "Order of the CPC classification in the list of classifications for the selected patent"
  },
  {
    "isQuery": "false",
    "group": "ipcs",
    "name": "IPC Section",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "ipc_section",
    "searchGroup": "ipc",
    "desc": "Highest hierarchical levels of the IPC corresponding to broad technical fields ( A = Human Necessitites, B = Performing Operations; Transporint, C = Chemistry; Metallurgy, D = Textiles; paper, E = Fixed Constructing, F = Mechanical Engineering; Lighting; Heating; Weapons; Blasting Engines; Pumps, G = Physics, H = Electricity)"
  },
  {
    "isQuery": "false",
    "group": "ipcs",
    "name": "IPC Class",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "ipc_class",
    "searchGroup": "ipc",
    "desc": "Second hierarchial level of the IPC system, sections are subdivided into classes"
  },
  {
    "isQuery": "false",
    "group": "ipcs",
    "name": "IPC Subclass",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "ipc_subclass",
    "searchGroup": "ipc",
    "desc": "Subdivisions IPC class"
  },
  {
    "isQuery": "false",
    "group": "ipcs",
    "name": "IPC Main Group",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "ipc_main_group",
    "searchGroup": "ipc",
    "desc": "Subdivisions of the IPC subclass"
  },
  {
    "isQuery": "false",
    "group": "ipcs",
    "name": "IPC Subgroup",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "ipc_subgroup",
    "searchGroup": "ipc",
    "desc": "Subdivisions of IPC main group"
  },
  {
    "isQuery": "true",
    "group": "ipcs",
    "name": "IPC First Seen Date",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "ipc_first_seen_date",
    "searchGroup": "ipc",
    "desc": "Grant date of the earliest patent in the database within a IPC group"
  },
  {
    "isQuery": "true",
    "group": "ipcs",
    "name": "IPC Last Seen Date",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "ipc_last_seen_date",
    "searchGroup": "ipc",
    "desc": "Grant date of the most recent patent in the database within a IPC group"
  },
  {
    "isQuery": "true",
    "group": "ipcs",
    "name": "IPC Sequence On Patent",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "integer",
    "id": "ipc_sequence",
    "searchGroup": "ipc",
    "desc": "Order of the IPC classification in the list of classifications for the selected patent"
  },
  {
    "isQuery": "true",
    "group": "ipcs",
    "name": "IPC Symbol Position",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "F",
      "L"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "ipc_symbol_position",
    "searchGroup": "ipc",
    "desc": "First or later position of symbols. The position of the first invention information classification can be recognized by this field. The letters \"F\" and \"L\" are used for the first and later position, respectively."
  },
  {
    "isQuery": "false",
    "group": "ipcs",
    "name": "IPC Action Date",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "ipc_action_date",
    "searchGroup": "ipc",
    "desc": "Date an International Patent Classification (IPC) is issued for the patent"
  },
  {
    "isQuery": "true",
    "group": "ipcs",
    "name": "IPC Class",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "ipc_section",
      "ipc_class",
      "ipc_subclass",
      "ipc_main_group",
      "ipc_subgroup"
    ],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "false",
    "type": "ipc",
    "id": "ipc_classes",
    "searchGroup": "ipc",
    "desc": "Second hierarchial level of the IPC system, sections are subdivided into classes"
  },
  {
    "isQuery": "false",
    "group": "ipcs",
    "name": "IPC Classification Data Source",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "ipc_classification_data_source",
    "searchGroup": "ipc",
    "desc": " “H” defining “Human - Generated”, “M” defining “Machine - Generated” and “G” defining “G enerated via Software”"
  },
  {
    "isQuery": "true",
    "group": "ipcs",
    "name": "IPC Classification Value",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "I",
      "N"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "ipc_classification_value",
    "searchGroup": "ipc",
    "desc": "“ I ” defining “invention information” or “N” defining “non - invention information”"
  },
  {
    "isQuery": "false",
    "group": "ipcs",
    "name": "IPC Version Indicator",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "ipc_version_indicator",
    "searchGroup": "ipc",
    "desc": "The version of the IPC classification system"
  },
  {
    "isQuery": "true",
    "group": "nbers",
    "name": "NBER Category ID",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "nber_category_id",
    "searchGroup": "nber",
    "desc": "National Bureau of Economic Research (NBER) technology category ID (see nber_category_title for details)"
  },
  {
    "isQuery": "true",
    "group": "nbers",
    "name": "NBER Subcategory ID",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "11",
      "12",
      "13",
      "14",
      "15",
      "19",
      "21",
      "22",
      "23",
      "24",
      "25",
      "31",
      "32",
      "33",
      "39",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "49",
      "51",
      "52",
      "53",
      "54",
      "55",
      "59",
      "61",
      "62",
      "63",
      "64",
      "65",
      "66",
      "67",
      "68",
      "69",
      "70"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "nber_subcategory_id",
    "searchGroup": "nber",
    "desc": "NBER subcategory ID (see nber_subcategory_title for details)"
  },
  {
    "isQuery": "true",
    "group": "nbers",
    "name": "NBER Category Title",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "Chemical",
      "Cmp & Cmm",
      "Drgs&Med",
      "Elec",
      "Mech",
      "Others",
      "Unclassified"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "nber_category_title",
    "searchGroup": "nber",
    "desc": "Description of NBER category"
  },
  {
    "isQuery": "true",
    "group": "nbers",
    "name": "NBER Subcategory Title",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "Unclassified",
      "Transportation",
      "Semiconductor Devices",
      "Resins",
      "Receptacles",
      "Power Systems",
      "Pipes & Joints",
      "Organic Compounds",
      "Optics",
      "Nuclear & X-rays",
      "Motors & Engines + Parts",
      "Miscellaneous",
      "Metal Working",
      "Measuring & Testing",
      "Mat. Proc & Handling",
      "Information Storage",
      "Heating",
      "Genetics",
      "Gas",
      "Furniture,House Fixtures",
      "Electronic business methods and software",
      "Electrical Lighting",
      "Electrical Devices",
      "Earth Working & Wells",
      "Drugs",
      "Computer Peripherials",
      "Computer Hardware & Software",
      "Communications",
      "Coating",
      "Apparel & Textile",
      "Amusement Devices",
      "Agriculture,Husbandry,Food",
      "Agriculture,Food,Textiles"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "nber_subcategory_title",
    "searchGroup": "nber",
    "desc": "Description of NBER subcategory"
  },
  {
    "isQuery": "true",
    "group": "nbers",
    "name": "NBER First Seen Date",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "nber_first_seen_date",
    "searchGroup": "nber",
    "desc": "Grant date of the earliest patent in the database within a NBER subcategory"
  },
  {
    "isQuery": "true",
    "group": "nbers",
    "name": "NBER Last Seen Date",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "nber_last_seen_date",
    "searchGroup": "nber",
    "desc": "Grant date of the most recent patent in the database within a NBER subcategory"
  },
  {
    "isQuery": "false",
    "group": "uspcs",
    "name": "USPC Mainclass ID",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "uspc_mainclass_id",
    "searchGroup": "uspc",
    "desc": "ID of the USPC mainclass"
  },
  {
    "isQuery": "false",
    "group": "uspcs",
    "name": "USPC Subclass ID",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "uspc_subclass_id",
    "searchGroup": "uspc",
    "desc": "ID of USPC subclass"
  },
  {
    "isQuery": "true",
    "group": "uspcs",
    "name": "USPC Mainclass Title",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "uspc_mainclass_title",
    "searchGroup": "uspc",
    "desc": "Description of USPC mainclass"
  },
  {
    "isQuery": "true",
    "group": "uspcs",
    "name": "USPC Class",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "uspc_mainclass_id",
      "uspc_subclass_id"
    ],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "false",
    "type": "uspc",
    "id": "uspc_class",
    "searchGroup": "uspc",
    "desc": "USPC Class"
  },
  {
    "isQuery": "true",
    "group": "uspcs",
    "name": "USPC Subclass Title",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "uspc_subclass_title",
    "searchGroup": "uspc",
    "desc": "Description of USPC subclass"
  },
  {
    "isQuery": "true",
    "group": "uspcs",
    "name": "USPC First Seen Date",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "uspc_first_seen_date",
    "searchGroup": "uspc",
    "desc": "Grant date of the earliest patent in the database within a USPC mainclass"
  },
  {
    "isQuery": "true",
    "group": "uspcs",
    "name": "USPC Last Seen Date",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "date",
    "id": "uspc_last_seen_date",
    "searchGroup": "uspc",
    "desc": "Grant date of the most recent patent in the database within a USPC mainclass"
  },
  {
    "isQuery": "true",
    "group": "uspcs",
    "name": "USPC Sequence On Patent",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "integer",
    "id": "uspc_sequence",
    "searchGroup": "uspc",
    "desc": "Order of the USPC classification in the list of classifications for the selected patent"
  },
  {
    "isQuery": "true",
    "group": "wipos",
    "name": "WIPO Technology Field ID",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35"
    ],
    "fieldType": "select",
    "isSort": "true",
    "isOutput": "true",
    "type": "integer",
    "id": "wipo_field_id",
    "searchGroup": "patent",
    "desc": "ID of WIPO technology field"
  },
  {
    "isQuery": "true",
    "group": "wipos",
    "name": "WIPO Technology Sector Title",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "wipo_sector_title",
    "searchGroup": "patent",
    "desc": "Description of WIPO technology sector"
  },
  {
    "isQuery": "true",
    "group": "wipos",
    "name": "WIPO Technology Field Title",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "string",
    "id": "wipo_field_title",
    "searchGroup": "patent",
    "desc": "Description of WIPO technology field"
  },
  {
    "isQuery": "true",
    "group": "wipos",
    "name": "WIPO Sequence On Patent",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "true",
    "isOutput": "true",
    "type": "integer",
    "id": "wipo_sequence",
    "searchGroup": "patent",
    "desc": "Order of the WIPO technology field in the list of technology fields for the selected patent"
  },
  {
    "isQuery": "true",
    "group": "assignees",
    "name": "Assignee County FIPS Code",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "integer-exact",
    "id": "assignee_county_fips",
    "searchGroup": "patent",
    "desc": "FIPS code for the county associated with the assignee"
  },
  {
    "isQuery": "true",
    "group": "assignees",
    "name": "Assignee Country",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "string",
    "id": "assignee_country",
    "searchGroup": "patent",
    "desc": "Country associated with the assignee"
  },
  {
    "isQuery": "true",
    "group": "assignees",
    "name": "Assignee State FIPS Code",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "integer-exact",
    "id": "assignee_state_fips",
    "searchGroup": "patent",
    "desc": "FIPS code for the stateassociated with the assignee"
  },
  {
    "isQuery": "false",
    "group": "assignees",
    "name": "Length of Detailed Description",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "integer",
    "id": "detail_desc_length",
    "searchGroup": "patent",
    "desc": "Length (in characters) of the detailed description of this patent"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "First Name of Patent Examiner",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "string",
    "id": "examiner_first_name",
    "searchGroup": "patent",
    "desc": "First name of the patent examiner"
  },
  {
    "isQuery": "false",
    "group": "applications",
    "name": "ID of Patent Examiner",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "string",
    "id": "examiner_id",
    "searchGroup": "patent",
    "desc": "ID of the patent examiner"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Last Name of Patent Examiner",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "string",
    "id": "examiner_last_name",
    "searchGroup": "patent",
    "desc": "Last name of the patent examiner"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Role of Patent Examiner",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [
      "Primary",
      "Assistant"
    ],
    "fieldType": "select",
    "isSort": "false",
    "isOutput": "true",
    "type": "string",
    "id": "examiner_role",
    "searchGroup": "patent",
    "desc": "Role of the patent examiner (ie are they the primary or assistant examiner)"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Group of Patent Examiner",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "string",
    "id": "examiner_group",
    "searchGroup": "patent",
    "desc": "Group to which the patent examiner belongs"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Country in which a Foreign Prioirty Claim Exists",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "string",
    "id": "forprior_country",
    "searchGroup": "patent",
    "desc": "Country that a foreign patent application with prioirty has been filed in"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Date of Foreign Priority Claim",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "date",
    "id": "forprior_date",
    "searchGroup": "patent",
    "desc": "Date on which a foreign patent application with prioirty has been filed in"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Document Number of Foreign Prioirty Claim",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "string",
    "id": "forprior_docnumber",
    "searchGroup": "patent",
    "desc": "Document number of foreign patent application with prioirty "
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Kind of Foreign Priority Claim",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "string",
    "id": "forprior_kind",
    "searchGroup": "patent",
    "desc": "The patent kind of foreign patent application with prioirty"
  },
  {
    "isQuery": "false",
    "group": "applications",
    "name": "Order in which the Prioirty Claim Appears",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "integer",
    "id": "forprior_sequence",
    "searchGroup": "patent",
    "desc": "Order in which this prioirty claim appears"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Inventor Country",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "string",
    "id": "inventor_country",
    "searchGroup": "inventor",
    "desc": "Country associated with the inventor"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Inventor County FIPS Code",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "integer-exact",
    "id": "inventor_county_fips",
    "searchGroup": "inventor",
    "desc": "FIPS code of county associated with the inventor"
  },
  {
    "isQuery": "true",
    "group": "inventors",
    "name": "Inventor State",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "integer-exact",
    "id": "inventor_state_fips",
    "searchGroup": "inventor",
    "desc": "state associated with the inventor"
  },
  {
    "isQuery": "true",
    "group": "lawyers",
    "name": "First Name of Patent Lawyer",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "string",
    "id": "lawyer_first_name",
    "searchGroup": "lawyer",
    "desc": "First name of the patent lawyer"
  },
  {
    "isQuery": "true",
    "group": "lawyers",
    "name": "Date the Lawyer First Patented",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "date",
    "id": "lawyer_first_seen_date",
    "searchGroup": "lawyer",
    "desc": "Date on which this (disambiguated) lawyer first appears in patent date"
  },
  {
    "isQuery": "true",
    "group": "lawyers",
    "name": "ID of Lawyer",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "string",
    "id": "lawyer_id",
    "searchGroup": "lawyer",
    "desc": "ID of the patent lawyer"
  },
  {
    "isQuery": "true",
    "group": "lawyers",
    "name": "Date the Lawyer Last Patented",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "date",
    "id": "lawyer_last_seen_date",
    "searchGroup": "lawyer",
    "desc": "Date on which this (disambiguated) lawyer last appears in patent date"
  },
  {
    "isQuery": "true",
    "group": "lawyers",
    "name": "Company or Organizaiton the Lawyer Belongs too",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "string",
    "id": "lawyer_organization",
    "searchGroup": "lawyer",
    "desc": "organization to which this lawyer belongs"
  },
  {
    "isQuery": "false",
    "group": "lawyers",
    "name": "Order in which the Lawyer Appears on the Patent",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "integer",
    "id": "lawyer_sequence",
    "searchGroup": "lawyer",
    "desc": "Order in which this lawyer appears on the patent"
  },
  {
    "isQuery": "false",
    "group": "lawyers",
    "name": "Total Number of Assignees Associated with the Lawyer",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "integer",
    "id": "lawyer_total_num_assignees",
    "searchGroup": "lawyer",
    "desc": "Total Number of Assignees Associated with the Lawyer"
  },
  {
    "isQuery": "false",
    "group": "lawyers",
    "name": "Total Number of Inventors Associated with the Lawyer",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "integer",
    "id": "lawyer_total_num_inventors",
    "searchGroup": "lawyer",
    "desc": "Total Number of Inventors Associated with the Lawyer"
  },
  {
    "isQuery": "false",
    "group": "lawyers",
    "name": "Total Number of Patents Associated with the Lawyer",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "integer",
    "id": "lawyer_total_num_patents",
    "searchGroup": "lawyer",
    "desc": "Total Number of Patents Associated with the Lawyer"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Patent Cooperation Treaty 102 Date",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "date",
    "id": "pct_102_date",
    "searchGroup": "patent",
    "desc": "102 Date for a Patent Cooperation Treaty filing"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Patent Cooperation Treaty 371 Date",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "date",
    "id": "pct_371_date",
    "searchGroup": "patent",
    "desc": "371 Date for a Patent Cooperation Treaty filing"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Patent Cooperation Treaty Date",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "date",
    "id": "pct_date",
    "searchGroup": "patent",
    "desc": "Date for a Patent Cooperation Treaty filing"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Patent Cooperation Treaty Document Number",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "string",
    "id": "pct_docnumber",
    "searchGroup": "patent",
    "desc": "Document number for a Patent Cooperation Treaty filing"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Patent Cooperation Treaty Document Type",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "string",
    "id": "pct_doctype",
    "searchGroup": "patent",
    "desc": "Document Type for a Patent Cooperation Treaty filing"
  },
  {
    "isQuery": "true",
    "group": "applications",
    "name": "Patent Cooperation Treaty Document Kind",
    "entities": [
      "patent",
      "assignee",
      "inventor"
    ],
    "values": [],
    "fieldType": "input",
    "isSort": "false",
    "isOutput": "true",
    "type": "string",
    "id": "pct_kind",
    "searchGroup": "patent",
    "desc": "Kind of a Patent Cooperation Treaty filing"
  }
]