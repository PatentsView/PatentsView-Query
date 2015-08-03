[
    {
        "isQuery": "true",
        "group": "Patent Application",
        "name": "Filing Date",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "app_date",
        "desc": "Date the patent application was filed (filing date)"
    },
    {
        "isQuery": "true",
        "group": "Patent Application",
        "name": "Number",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "app_number",
        "desc": "Application ID assigned by USPTO"
    },
    {
        "isQuery": "true",
        "group": "Patent Application",
        "name": "Type",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
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
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "app_type",
        "desc": "Patent Application Type (From XML data dictionary). 02 through 28 = Utility application; 29, D = Design application; 60 = Provisional application; 90 = Reexamination request"
    },
    {
        "isQuery": "true",
        "group": "US only Patent Applications Cited by Patents",
        "name": "Application Number",
        "entities": [
            "patent",
            "location"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "appcit_app_number",
        "desc": "Application ID (issued by USPTO) for application cited by the selected patent"
    },
    {
        "isQuery": "true",
        "group": "US only Patent Applications Cited by Patents",
        "name": "Category",
        "entities": [
            "patent",
            "location"
        ],
        "values": [
            "cited by examiner",
            "cited by applicant",
            "cited by other",
            "cited by third party"
        ],
        "fieldType": "select",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "appcit_category",
        "desc": "Entity that cited an application in the selected patent"
    },
    {
        "isQuery": "true",
        "group": "US only Patent Applications Cited by Patents",
        "name": "Filing Date",
        "entities": [
            "patent",
            "location"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "appcit_date",
        "desc": "Filing date for application cited in the selected patent"
    },
    {
        "isQuery": "true",
        "group": "US only Patent Applications Cited by Patents",
        "name": "Kind",
        "entities": [
            "patent",
            "location"
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
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "appcit_kind",
        "desc": "Patent kind of application cited by patent"
    },
    {
        "isQuery": "false",
        "group": "US only Patent Applications Cited by Patents",
        "name": "Sequence",
        "entities": [
            "patent",
            "location"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "integer",
        "id": "appcit_sequence",
        "desc": "Order in which a citation is cited by patent"
    },
    {
        "isQuery": "true",
        "group": "Patent Assignee",
        "name": "First Name",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "assignee_first_name",
        "desc": "First name, if assignee is individual"
    },
    {
        "isQuery": "true",
        "group": "Patent Assignee",
        "name": "First Seen Date",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "assignee_first_seen_date",
        "desc": "Earliest patent grant date for all of an asisgnee's patents in the database"
    },
    {
        "isQuery": "true",
        "group": "Patent Assignee",
        "name": "ID",
        "entities": [
            "patent",
            "assignee",
            "cpcSubsection",
            "location",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "assignee_id",
        "desc": "Unique database assignee ID assigned by disambiguation algorithm"
    },
    {
        "isQuery": "true",
        "group": "Patent Assignee",
        "name": "Last Name",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "assignee_last_name",
        "desc": "Last name, if assignee is individual"
    },
    {
        "isQuery": "true",
        "group": "Patent Assignee",
        "name": "Last Seen Date",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "assignee_last_seen_date",
        "desc": "Most recent patent grant date for all of the asisgnee's patents in the database"
    },
    {
        "isQuery": "true",
        "group": "Patent Assignee",
        "name": "Last Known Location",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [
        ],
        "fieldType": "location",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "location",
        "id": "assignee_lastknown_location",
        "desc": "Assignee's location as of their most recent patent grant date (equivalently, as of assignee_last_seen_date)"
    },
    {
        "isQuery": "true",
        "group": "Patent Assignee",
        "name": "Location At Issue",
        "entities": [
            "patent",
            "cpcSubsection",
            "nberSubcategory",
            "uspcMainclass",
            "inventor"
        ],
        "values": [
        ],
        "fieldType": "location",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "location",
        "id": "assignee_location",
        "desc": "Assignee's location as listed on the patent"
    },
    {
        "isQuery": "true",
        "group": "Patent Assignee",
        "name": "Organization",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "assignee_organization",
        "desc": "Organization name, if assignee is organization"
    },
    {
        "isQuery": "true",
        "group": "Patent Assignee",
        "name": "Sequence",
        "entities": [
            "patent"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "integer",
        "id": "assignee_sequence",
        "desc": "Order in which assignee appears on the patent"
    },
    {
        "isQuery": "true",
        "group": "Patent Assignee",
        "name": "Type",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
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
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "assignee_type",
        "desc": "Classification of assignee. 2 - US Company or Corporation, 3 - Foreign Company or Corporation, 4 - US Individual, 5 - Foreign Individual, 6 - US Government, 7 - Foreign Government, 8 - Country Government, 9 - State Government (US). Note: A \"1\" appearing before any of these codes signifies part interest"
    },
    {
        "isQuery": "true",
        "group": "Patents Cited by Other Patents",
        "name": "Patent Category",
        "entities": [
            "patent",
            "location"
        ],
        "values": [
            "cited by examiner",
            "cited by applicant",
            "cited by other",
            "cited by third party"
        ],
        "fieldType": "select",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "cited_patent_category",
        "desc": "Category of cited patent "
    },
    {
        "isQuery": "true",
        "group": "Patents Cited by Other Patents",
        "name": "Patent Date",
        "entities": [
            "patent",
            "location"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "cited_patent_date",
        "desc": "Grant data of cited patent"
    },
    {
        "isQuery": "true",
        "group": "Patents Cited by Other Patents",
        "name": "Patent Kind",
        "entities": [
            "patent",
            "location"
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
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "cited_patent_kind",
        "desc": "Patent kind of cited patent  (see patent_kind for details)"
    },
    {
        "isQuery": "true",
        "group": "Patents Cited by Other Patents",
        "name": "Patent Number",
        "entities": [
            "patent",
            "location"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "cited_patent_number",
        "desc": "Patent number of cited patent"
    },
    {
        "isQuery": "false",
        "group": "Patents Cited by Other Patents",
        "name": "Patent Sequence",
        "entities": [
            "patent",
            "location"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "cited_patent_sequence",
        "desc": "Order in which patent is cited by the selected patent"
    },
    {
        "isQuery": "true",
        "group": "Patents Cited by Other Patents",
        "name": "Patent Title",
        "entities": [
            "patent",
            "location"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "cited_patent_title",
        "desc": "Title of cited patent"
    },
    {
        "isQuery": "true",
        "group": "Patents Citing a Given Patent",
        "name": "Patent Category",
        "entities": [
            "patent",
            "location"
        ],
        "values": [
            "cited by examiner",
            "cited by applicant",
            "cited by other",
            "cited by third party"
        ],
        "fieldType": "select",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "citedby_patent_category",
        "desc": "Category of citing patent"
    },
    {
        "isQuery": "true",
        "group": "Patents Citing a Given Patent",
        "name": "Patent Date",
        "entities": [
            "patent",
            "location"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "citedby_patent_date",
        "desc": "Grant date of patent citing the selected patent"
    },
    {
        "isQuery": "true",
        "group": "Patents Citing a Given Patent",
        "name": "Patent Kind",
        "entities": [
            "patent",
            "location"
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
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "citedby_patent_kind",
        "desc": "Patent kind of citing patent (see patent_kind for details)"
    },
    {
        "isQuery": "true",
        "group": "Patents Citing a Given Patent",
        "name": "Patent Number",
        "entities": [
            "patent",
            "location"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "citedby_patent_number",
        "desc": "Patent number of citing patent"
    },
    {
        "isQuery": "true",
        "group": "Patents Citing a Given Patent",
        "name": "Patent Title",
        "entities": [
            "patent",
            "location"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "citedby_patent_title",
        "desc": "Title of citing patent"
    },
    {
        "isQuery": "true",
        "group": "Co-inventors on a Given Patent",
        "name": "Location at issue",
        "entities": [
            "inventor"
        ],
        "values": [
        ],
        "fieldType": "location",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "location",
        "id": "coinventor_location",
        "desc": "Coinventor's location as listed on the patent"
    },
    {
        "isQuery": "true",
        "group": "Co-inventors on a Given Patent",
        "name": "First Name",
        "entities": [
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "coinventor_first_name",
        "desc": "First name of the coinventor"
    },
    {
        "isQuery": "true",
        "group": "Co-inventors on a Given Patent",
        "name": "First Seen Date",
        "entities": [
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "coinventor_first_seen_date",
        "desc": "Grant date of coinventor's earliest patent"
    },
    {
        "isQuery": "true",
        "group": "Co-inventors on a Given Patent",
        "name": "ID",
        "entities": [
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "coinventor_id",
        "desc": "Unique ID for a coinventor assigned by disambiguation algorithm"
    },
    {
        "isQuery": "true",
        "group": "Co-inventors on a Given Patent",
        "name": "Last Name",
        "entities": [
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "coinventor_last_name",
        "desc": "Last name of the coinventor"
    },
    {
        "isQuery": "true",
        "group": "Co-inventors on a Given Patent",
        "name": "Last Seen Date",
        "entities": [
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "coinventor_last_seen_date",
        "desc": "Grant date of coinventor's most recent patent in the database"
    },
    {
        "isQuery": "true",
        "group": "Co-inventors on a Given Patent",
        "name": "Last Known Location",
        "entities": [
            "inventor"
        ],
        "values": [
        ],
        "fieldType": "location",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "location",
        "id": "coinventor_lastknown_location",
        "desc": "Coinventor's location as of their most recent patent grant date (equivalently, as of coinventor_last_seen_date)"
    },
    {
        "isQuery": "true",
        "group": "Cooperative Patent Class",
        "name": "Category",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [
            "Primary",
            "Additional"
        ],
        "fieldType": "select",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "cpc_category",
        "desc": "Top Level Cooperative Patent Classification (CPC) category (http://www.cooperativepatentclassification.org/index.html)"
    },
    {
        "isQuery": "true",
        "group": "Cooperative Patent Class",
        "name": "First Seen Date",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "cpc_first_seen_date",
        "desc": "Grant date of the earliest patent in the database within a CPC subsection."
    },
    {
        "isQuery": "true",
        "group": "Cooperative Patent Class",
        "name": "Group ID",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "cpc_group_id",
        "desc": "CPC group ID"
    },
    {
        "isQuery": "true",
        "group": "Cooperative Patent Class",
        "name": "Group Title",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "cpc_group_title",
        "desc": "Description of CPC group"
    },
    {
        "isQuery": "true",
        "group": "Cooperative Patent Class",
        "name": "Last Seen Date",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "cpc_last_seen_date",
        "desc": "Grant date of the most recent patent in the database within a CPC subsection"
    },
    {
        "isQuery": "true",
        "group": "Cooperative Patent Class",
        "name": "Section ID",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
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
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "cpc_section_id",
        "desc": "CPC section ID (A = Human Necessitites, B = Performing Operations; Transporint, C = Chemistry; Metallurgy, D = Textiles; paper, E = Fixed Constructing, F = Mechanical Engineering; Lighting; Heating; Weapons; Blasting Engines; Pumps, G = Physics, H = Electricity, Y = General Tagging of new technological developments)"
    },
    {
        "isQuery": "true",
        "group": "Cooperative Patent Class",
        "name": "Subgroup ID",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "cpc_subgroup_id",
        "desc": "CPC subgroup ID"
    },
    {
        "isQuery": "true",
        "group": "Cooperative Patent Class",
        "name": "Subgroup Title",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "cpc_subgroup_title",
        "desc": "Description of CPC subgroup"
    },
    {
        "isQuery": "true",
        "group": "Cooperative Patent Class",
        "name": "Subsection ID",
        "entities": [
            "patent",
            "assignee",
            "cpcSubsection",
            "location",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "cpc_subsection_id",
        "desc": "CPC subsection ID"
    },
    {
        "isQuery": "true",
        "group": "Cooperative Patent Class",
        "name": "Subsection Title",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "cpc_subsection_title",
        "desc": "Description of CPC subsection"
    },
    {
        "isQuery": "true",
        "group": "Inventor",
        "name": "Location at issue",
        "entities": [
            "nberSubcategory",
            "patent",
            "assignee",
            "uspcMainclass",
            "cpcSubsection",
            "inventor"
        ],
        "values": [
        ],
        "fieldType": "location",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "location",
        "id": "inventor_location",
        "desc": "Inventor's location as listed on the selected patent"
    },
    {
        "isQuery": "true",
        "group": "Inventor",
        "name": "First Name",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "inventor_first_name",
        "desc": "First name of inventor"
    },
    {
        "isQuery": "true",
        "group": "Inventor",
        "name": "First Seen Date",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "inventor_first_seen_date",
        "desc": "Earliest patent grant date for all the inventor's patents in the database"
    },
    {
        "isQuery": "true",
        "group": "Inventor",
        "name": "ID",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "inventor_id",
        "desc": "Unique database inventor ID  by disambiguation algorithm"
    },
    {
        "isQuery": "true",
        "group": "Inventor",
        "name": "Last Name",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "inventor_last_name",
        "desc": "Last name of inventor"
    },
    {
        "isQuery": "true",
        "group": "Inventor",
        "name": "Last Seen Date",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "inventor_last_seen_date",
        "desc": "Most recent patent grant date for all the inventor's patents in the database"
    },
    {
        "isQuery": "true",
        "group": "Inventor",
        "name": "Last Known Location",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [
        ],
        "fieldType": "location",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "location",
        "id": "inventor_lastknown_location",
        "desc": "Inventor's location as of their most recent patent grant date (equivalently, as of inventor_last_seen_date)"
    },
    {
        "isQuery": "true",
        "group": "Inventor",
        "name": "Sequence",
        "entities": [
            "patent"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "integer",
        "id": "inventor_sequence",
        "desc": "Order in which inventor is listed on the patent"
    },
    {
        "isQuery": "false",
        "group": "International Patent Class",
        "name": "Action Date",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "ipc_action_date",
        "desc": "Date an International Patent Classification (IPC) is issued for the patent"
    },
    {
        "isQuery": "true",
        "group": "International Patent Class",
        "name": "Class",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "ipc_class",
        "desc": "Second hierarchial level of the IPC system, sections are subdivided into classes"
    },
    {
        "isQuery": "false",
        "group": "International Patent Class",
        "name": "Classification Data Source",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [
            "H",
            "M",
            "G"
        ],
        "fieldType": "select",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "ipc_classification_data_source",
        "desc": " \u201cH\u201d defining \u201cHuman - Generated\u201d, \u201cM\u201d defining \u201cMachine - Generated\u201d and \u201cG\u201d defining \u201cG enerated via Software\u201d"
    },
    {
        "isQuery": "true",
        "group": "International Patent Class",
        "name": "Classification Value",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [
            "I",
            "N"
        ],
        "fieldType": "select",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "ipc_classification_value",
        "desc": "\u201c I \u201d defining \u201cinvention information\u201d or \u201cN\u201d defining \u201cnon - invention information\u201d"
    },
    {
        "isQuery": "true",
        "group": "International Patent Class",
        "name": "First Seen Date",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "ipc_first_seen_date",
        "desc": "Grant date of the earliest patent in the database within a IPC group"
    },
    {
        "isQuery": "true",
        "group": "International Patent Class",
        "name": "Last Seen Date",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "ipc_last_seen_date",
        "desc": "Grant date of the most recent patent in the database within a IPC group"
    },
    {
        "isQuery": "true",
        "group": "International Patent Class",
        "name": "Main Group",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "ipc_main_group",
        "desc": "Subdivisions of the IPC subclass"
    },
    {
        "isQuery": "true",
        "group": "International Patent Class",
        "name": "Section",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
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
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "ipc_section",
        "desc": "Highest hierarchical levels of the IPC corresponding to broad technical fields ( A = Human Necessitites, B = Performing Operations; Transporint, C = Chemistry; Metallurgy, D = Textiles; paper, E = Fixed Constructing, F = Mechanical Engineering; Lighting; Heating; Weapons; Blasting Engines; Pumps, G = Physics, H = Electricity)"
    },
    {
        "isQuery": "true",
        "group": "International Patent Class",
        "name": "Subclass",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
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
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "ipc_subclass",
        "desc": "Subdivisions IPC class"
    },
    {
        "isQuery": "true",
        "group": "International Patent Class",
        "name": "Subgroup",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "ipc_subgroup",
        "desc": "Subdivisions of IPC main group"
    },
    {
        "isQuery": "true",
        "group": "International Patent Class",
        "name": "Position",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [
            "F",
            "L"
        ],
        "fieldType": "select",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "ipc_symbol_position",
        "desc": "First or later position of symbols. The position of the first invention information classification can be recognized by this field. The letters \"F\" and \"L\" are used for the first and later position, respectively."
    },
    {
        "isQuery": "false",
        "group": "International Patent Class",
        "name": "Version Indicator",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "ipc_version_indicator",
        "desc": "The version of the IPC classification system"
    },
    {
        "isQuery": "true",
        "group": "NBER Technology Area",
        "name": "Category ID",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
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
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "nber_category_id",
        "desc": "National Bureau of Economic Research (NBER) technology category ID (see nber_category_title for details)"
    },
    {
        "isQuery": "true",
        "group": "NBER Technology Area",
        "name": "Category Title",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
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
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "nber_category_title",
        "desc": "Description of NBER category"
    },
    {
        "isQuery": "true",
        "group": "NBER Technology Area",
        "name": "First Seen Date",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "nber_first_seen_date",
        "desc": "Grant date of the earliest patent in the database within a NBER subcategory"
    },
    {
        "isQuery": "true",
        "group": "NBER Technology Area",
        "name": "Last Seen Date",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "nber_last_seen_date",
        "desc": "Grant date of the most recent patent in the database within a NBER subcategory"
    },
    {
        "isQuery": "true",
        "group": "NBER Technology Area",
        "name": "Subcategory ID",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
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
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "nber_subcategory_id",
        "desc": "NBER subcategory ID (see nber_subcategory_title for details)"
    },
    {
        "isQuery": "true",
        "group": "NBER Technology Area",
        "name": "Subcategory Title",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
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
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "nber_subcategory_title",
        "desc": "Description of NBER subcategory"
    },
    {
        "isQuery": "false",
        "group": "Patent",
        "name": "Abstract",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "full text",
        "id": "patent_abstract",
        "desc": "Abstract of the patent"
    },
    {
        "isQuery": "true",
        "group": "Patent",
        "name": "Average Processing Time",
        "entities": [
            "patent",
            "location"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "integer",
        "id": "patent_average_processing_time",
        "desc": "Average processing time for patents in the same USPC mainclass category as the selected patent"
    },
    {
        "isQuery": "true",
        "group": "Patent",
        "name": "Grant Date",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "patent_date",
        "desc": "Date patent was granted"
    },
    {
        "isQuery": "true",
        "group": "Patent",
        "name": "First Named Assignee Location at issue",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [
        ],
        "fieldType": "location",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "location",
        "id": "patent_firstnamed_assignee_location",
        "desc": "Location of the first-named (i.e. first in the list) assignee on the patent"
    },
    {
        "isQuery": "true",
        "group": "Patent",
        "name": "First Named Assignee ID",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "patent_firstnamed_assignee_id",
        "desc": "Assignee ID (assignee_id) for the first-named (i.e. first in the list) assignee on the patent"
    },
    {
        "isQuery": "true",
        "group": "Patent",
        "name": "First Named Inventor Location at issue",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [
        ],
        "fieldType": "location",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "location",
        "id": "patent_firstnamed_inventor_location",
        "desc": "Location of the the first-named (i.e. first in the list) inventor on the patent"
    },
    {
        "isQuery": "true",
        "group": "Patent",
        "name": "First Named Inventor ID",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "patent_firstnamed_inventor_id",
        "desc": "Inventor ID (inventor_id) for the first-named (i.e. first in the list) inventor on the patent"
    },
    {
        "isQuery": "true",
        "group": "Patent",
        "name": "Kind",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
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
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "patent_kind",
        "desc": "World Intellectual Property Organization (WIPO) Standard ST.16 Patent Code (http://www.uspto.gov/learning-and-resources/support-centers/electronic-business-center/kind-codes-included-uspto-patent)"
    },
    {
        "isQuery": "true",
        "group": "Patent",
        "name": "Number",
        "entities": [
            "patent",
            "assignee",
            "uspcMainclass",
            "location",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "patent_number",
        "desc": "US Patent number, as assigned by USPTO"
    },
    {
        "isQuery": "true",
        "group": "Patent",
        "name": "Processing Time",
        "entities": [
            "patent",
            "location"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "integer",
        "id": "patent_processing_time",
        "desc": "Time from filing application date to grant date for the patent"
    },
    {
        "isQuery": "true",
        "group": "Patent",
        "name": "Title",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "full text",
        "id": "patent_title",
        "desc": "Title of the  patent"
    },
    {
        "isQuery": "true",
        "group": "Patent",
        "name": "Type",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
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
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "patent_type",
        "desc": "Category of patent. There are 6 possible type: \"Defensive Publication\" - 509, \"Design\" - 474736, \"Plant\" - 21052, \"Reissue\" - 16416, \"Statutory Invention Registration\" - 2254, \"Utility\" - 4910906."
    },
    {
        "isQuery": "true",
        "group": "Patent",
        "name": "Year",
        "entities": [
            "patent",
            "location"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "integer",
        "id": "patent_year",
        "desc": "Year patent was granted"
    },
    {
        "isQuery": "true",
        "group": "US Patent Class",
        "name": "First Seen Date",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "uspc_first_seen_date",
        "desc": "Grant date of the earliest patent in the database within a USPC mainclass"
    },
    {
        "isQuery": "true",
        "group": "US Patent Class",
        "name": "Last Seen Date",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "date",
        "id": "uspc_last_seen_date",
        "desc": "Grant date of the most recent patent in the database within a USPC mainclass"
    },
    {
        "isQuery": "true",
        "group": "US Patent Class",
        "name": "Mainclass ID",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "uspc_mainclass_id",
        "desc": "ID of the USPC mainclass"
    },
    {
        "isQuery": "true",
        "group": "US Patent Class",
        "name": "Mainclass Title",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "uspc_mainclass_title",
        "desc": "Description of USPC mainclass"
    },
    {
        "isQuery": "true",
        "group": "US Patent Class",
        "name": "Subclass ID",
        "entities": [
            "patent",
            "assignee",
            "uspcMainclass",
            "location",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "uspc_subclass_id",
        "desc": "ID of USPC subclass"
    },
    {
        "isQuery": "true",
        "group": "US Patent Class",
        "name": "Subclass Title",
        "entities": [
            "nberSubcategory",
            "patent",
            "uspcMainclass",
            "assignee",
            "location",
            "cpcSubsection",
            "inventor"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "uspc_subclass_title",
        "desc": "Description of USPC subclass"
    },
    {
        "isQuery": "false",
        "group": "Location",
        "name": "City",
        "entities": [
            "location"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "location_city",
        "desc": "City associated with the location at issue"
    },
    {
        "isQuery": "false",
        "group": "Location",
        "name": "State",
        "entities": [
            "location"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "location_state",
        "desc": "State associated with the location at issue"
    },
    {
        "isQuery": "false",
        "group": "Location",
        "name": "Country",
        "entities": [
            "location"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "location_country",
        "desc": "Country associated with the location at issue"
    },
    {
        "isQuery": "false",
        "group": "Location",
        "name": "Location ID",
        "entities": [
            "location"
        ],
        "values": [

        ],
        "fieldType": "input",
        "isSort": "true",
        "isDefault": "false",
        "isOutput": "true",
        "type": "string",
        "id": "location_id",
        "desc": "Unique database location ID assigned by disambiguation algorithm"
    }
]