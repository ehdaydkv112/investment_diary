"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const class_validator_1 = require("class-validator");
class CreateInvestmentTitle {
    constructor(diaryName, content, eventArray) {
        this.diaryName = diaryName;
        this.content = content;
        this.eventArray = eventArray;
    }
    diaryName;
    content;
    eventArray;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)()
], CreateInvestmentTitle.prototype, "diaryName", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], CreateInvestmentTitle.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)()
], CreateInvestmentTitle.prototype, "eventArray", void 0);
module.exports = CreateInvestmentTitle;
