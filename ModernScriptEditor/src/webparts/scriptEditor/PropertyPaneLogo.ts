import { IPropertyPaneField, PropertyPaneFieldType, IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";

export class PropertyPaneLogo implements IPropertyPaneField<IPropertyPaneCustomFieldProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneCustomFieldProps;

    constructor() {
         this.properties = {
             key: "Logo",
             onRender: this.onRender.bind(this)
        };
    }

    private onRender(elem: HTMLElement): void {
        elem.innerHTML = `
    <div style="margin-top: 30px">
    </div>`;
    }
}
export default PropertyPaneLogo;