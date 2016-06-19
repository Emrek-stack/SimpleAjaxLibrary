/// <reference path="./typings/jquery/jquery.d.ts" />

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
        $.support.cors = true;

        $.ajaxSetup({
            cache: false
        });
        var JQryAjxSetting: JQueryAjaxSettings = {
            url: url,
            type: method.toString(),
            contentType: "application/json; charset=utf-8",
            dataType: dataType.toString(),
            async: true,
            data: data,
            crossDomain: true,
            beforeSend: function (request) {
                request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            },
            error: function (xhr, status, error) {
                if (errorfn != null) {
                    errorfn(xhr, status, error);
                }
            },
            success: function (data, status, xhr) {
                if (successfn != null) {
                    successfn(data, status, xhr);
                }
            },
            complete: function (data) {
                if (completefn != null) {
                    completefn(data);
                }
            }
            //jsonpCallback: 'itDoesntMatterNotAFunction',
        };
    }

    public Ajax(url: string, requestType: RequestType, dataType: DataType, paramArray: any, successfn: any, completefn: any, errorfn: any) {
        $.ajaxSetup({
            cache: false
        });
        let paramList = null;

        if (paramArray != null)
            paramList = this.formatParameters(paramArray, requestType);

        this.callAjax(requestType, url, paramList, dataType, successfn, completefn, errorfn);

    }

    public AjaxWithForm(formObj: any, dataType: DataType, successfn, completefn, errorfn) {
        let form = $(formObj);
        let options = form.data();

        //var url = options.ajaxForm === "True" ? (Configuration.apiServiceUrl + options.ajaxUrl + "?" + $.param(ServiceApiSecurity)) : form.attr("action");
        let url: string = form.attr("action");
        let method: RequestType = RequestType[form.attr("method").toUpperCase()];
        let formObjects = method === RequestType.POST ? form.serializeArray() : form.serialize();

        let paramList = this.formatParameters(formObjects, method);
        this.callAjax(method, url, paramList, dataType, successfn, completefn, errorfn);
    }


    public AjaxWebApi(url: string, requestType: RequestType, dataType: DataType, paramArray: any, successfn, completefn, errorfn) {
        $.ajaxSetup({
            cache: false
        });

        //url = Configuration.apiServiceUrl + url + "?" + $.param(ServiceApiSecurity);
        url = "" + url + "?" + $.param("");

        let paramList = null;

        if (paramArray != null)
            paramList = this.formatParameters(paramArray, requestType);

        this.callAjax(requestType, url, paramList, dataType, successfn, completefn, errorfn);
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