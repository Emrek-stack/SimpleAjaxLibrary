/// <reference path="./typings/jquery/jquery.d.ts" />
var AjaxManager = (function () {
    function AjaxManager() {
    }
    AjaxManager.prototype.formatParameters = function (formObjects, method) {
        var paramList = "";
        if (method.toUpperCase() === RequestType.POST) {
            if (formObjects.length > 0) {
                for (var i = 0; i < formObjects.length; i++) {
                    if (paramList.length > 0)
                        paramList += ",";
                    paramList += formObjects[i].name + " :\" " + formObjects[i].value + "\""; //formObjects[i].name + ':"' + formObjects[i].value + '"';
                }
                paramList = "{ " + paramList + " }";
            }
        }
        else if (method.toUpperCase() === RequestType.GET) {
            paramList = formObjects;
        }
        return paramList;
    };
    AjaxManager.prototype.callAjax = function (method, url, data, dataType, successfn, completefn, errorfn) {
        $.support.cors = true;
        $.ajaxSetup({
            cache: false
        });
        var JQryAjxSetting = {
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
        };
    };
    AjaxManager.prototype.Ajax = function (url, requestType, dataType, paramArray, successfn, completefn, errorfn) {
        $.ajaxSetup({
            cache: false
        });
        var paramList = null;
        if (paramArray != null)
            paramList = this.formatParameters(paramArray, requestType);
        //this.callAjax(requestType, url, paramList, successfn, completefn, errorfn);
    };
    AjaxManager.prototype.AjaxWithForm = function (formObj, dataType, successfn, completefn, errorfn) {
        var form = $(formObj);
        var options = form.data();
        //var url = options.ajaxForm === "True" ? (Configuration.apiServiceUrl + options.ajaxUrl + "?" + $.param(ServiceApiSecurity)) : form.attr("action");
        var url = form.attr("action");
        var method = RequestType[form.attr("method").toUpperCase()];
        var formObjects = method === RequestType.POST ? form.serializeArray() : form.serialize();
        var paramList = this.formatParameters(formObjects, method);
        this.callAjax(method, url, paramList, dataType, successfn, completefn, errorfn);
    };
    return AjaxManager;
}());
var RequestType;
(function (RequestType) {
    RequestType[RequestType["POST"] = 'POST'] = "POST";
    RequestType[RequestType["GET"] = 'GET'] = "GET";
})(RequestType || (RequestType = {}));
var DataType;
(function (DataType) {
    DataType[DataType["XML"] = 'xml'] = "XML";
    DataType[DataType["JSON"] = 'json'] = "JSON";
    DataType[DataType["SCRIPT"] = 'script'] = "SCRIPT";
    DataType[DataType["HTML"] = 'html'] = "HTML";
})(DataType || (DataType = {}));
var AjaxStatusResult;
(function (AjaxStatusResult) {
    AjaxStatusResult[AjaxStatusResult["ERROR"] = false] = "ERROR";
    AjaxStatusResult[AjaxStatusResult["SUCCES"] = true] = "SUCCES";
})(AjaxStatusResult || (AjaxStatusResult = {}));
