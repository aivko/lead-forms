import NiceSelect from "nice-select2/dist/js/nice-select2.js";
import countryList from "@/data/countries.json";
export const initSelect = ({ id }) => {
    const select = document.getElementById(id);
    countryList.forEach(function(country) {
        const option = document.createElement("option");
        option.text = country.name;
        option.value = country.code;
        select.appendChild(option);
    });

    new NiceSelect(document.getElementById(id));
}