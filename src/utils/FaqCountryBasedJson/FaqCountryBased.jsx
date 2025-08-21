import LoginIndia from "./India/LoginAccordianDetails.json"
import FEMAIndia from "./India/FEMAAccordianDetails.json"
import GstIndia from "./India/GstServiceAccordianDetails.json"
import RocIndia from "./India/ROCAccordianDetails.json"
import TaxIndia from "./India/TaxFilingAccordianDetails.json"
import {jobOpenings} from "../../components/HomePage/FAQs/dummyData"
const FaqCountryBased = [
    { "India": [LoginIndia, TaxIndia, GstIndia, FEMAIndia, RocIndia] },
    { "UAE": [jobOpenings,jobOpenings,jobOpenings,jobOpenings] },
    { "SaudiArabia": [jobOpenings,jobOpenings,jobOpenings,jobOpenings] },
    { "Oman": [jobOpenings,jobOpenings,jobOpenings,jobOpenings] },
    { "Qatar": [jobOpenings,jobOpenings,jobOpenings,jobOpenings] },
    { "Kuwait": [jobOpenings,jobOpenings,jobOpenings,jobOpenings] },
    { "Singapore": [jobOpenings,jobOpenings,jobOpenings,jobOpenings] },
];

export default FaqCountryBased;

