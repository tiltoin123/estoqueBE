import Template from "../models/Template";
import TemplateControls from "../models/TemplateControls";
import ListTemplateControlsService from "../services/TemplateControlsServices/ListTemplateControlsService";

const ConcatTemplateControlSet = async (templateControls: TemplateControls[]): Promise<string> => {


    if (templateControls) {
        let controlSet = "";

        templateControls.forEach(element => {
            controlSet += " " + element.choice;
        });

        return controlSet;
    }

    return "";
};

export default ConcatTemplateControlSet;
