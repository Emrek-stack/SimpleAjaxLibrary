class AjaxManager {


    private formatParameters(formObjects: any, method: any) {
        let paramList = "";
        if (method.toUpperCase() === RequestType.POST) {

            if (formObjects.length > 0) {
                for (let i = 0; i < formObjects.length; i++) {
                    if (paramList.length > 0) paramList += ",";
                    paramList += `${formObjects[i].name} :" ${formObjects[i].value}"`  //formObjects[i].name + ':"' + formObjects[i].value + '"';
                }
                paramList = `{ ${paramList} }`;

            }

        } else if (method.toUpperCase() === RequestType.GET) {
            paramList = formObjects;
        }
        return paramList;
    }

    private callAjax(method: RequestType, url: string, data: any, dataType: DataType, successfn, completefn, errorfn) {

    }

    public Ajax(url: string, requestType: RequestType, dataType: DataType, paramArray: any, successfn, completefn, errorfn) {
        //         $.ajaxSetup({
        //     cache: false
        // });
        let paramList = null;

        if (paramArray != null)
            paramList = this.formatParameters(paramArray, requestType);

        //this.callAjax(requestType, url, paramList, successfn, completefn, errorfn);

    }

    public AjaxWithForm(formObj: any, dataType: DataType, successfn, completefn, errorfn) {
        //let form = $(formObj);
        let form = formObj;
        let options = form.data();

        //var url = options.ajaxForm === "True" ? (Configuration.apiServiceUrl + options.ajaxUrl + "?" + $.param(ServiceApiSecurity)) : form.attr("action");
        let url = form.attr("action");
        let method = form.attr("method");
        let formObjects = method.toUpperCase() === RequestType.POST ? form.serializeArray() : form.serialize();

        let paramList = this.formatParameters(formObjects, method);
        this.callAjax(method, url, paramList, dataType, successfn, completefn, errorfn);
    }

}

enum RequestType {
    POST = <any>'POST',
    GET = <any>'GET'
}

enum DataType {
    XML = <any>'xml',
    JSON = <any>'json',
    SCRIPT = <any>'script',
    HTML = <any>'html'
}

enum AjaxStatusResult {
    ERROR = <any>false,
    SUCCES = <any>true
}