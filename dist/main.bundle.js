webpackJsonp([0,3],{

/***/ 1000:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(423);


/***/ },

/***/ 159:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__party_party__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__random_service__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_service__ = __webpack_require__(87);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return PartyService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PartyService = (function () {
    function PartyService(af, randomService, userService) {
        this.af = af;
        this.randomService = randomService;
        this.userService = userService;
    }
    // Fetch a party based on its id
    PartyService.prototype.get = function (id) {
        return this.af.database.list('/parties', {
            query: {
                orderByChild: 'id',
                equalTo: id
            }
        });
    };
    // Create a party
    PartyService.prototype.create = function (title) {
        var _this = this;
        var party = new __WEBPACK_IMPORTED_MODULE_2__party_party__["a" /* Party */](this.randomService.generateId(), title);
        return new Promise(function (resolve, reject) {
            _this.af.database.list('/parties').push(party).then(function () {
                resolve(party);
            });
        });
    };
    // Add an item to a category
    PartyService.prototype.addItem = function (party, category, item) {
        var key = this.getItemsListKey(party, category);
        if (!category.items) {
            category.items = {};
        }
        item.setUser(this.userService.getBasicUser());
        item.beforeSave();
        category.items[this.randomService.generateId()] = item;
        this.af.database.list('/parties').update(key, category.items);
    };
    // Remove an item from a category
    PartyService.prototype.removeItem = function (party, category, item) {
        var key = this.getItemsListKey(party, category);
        for (var _i = 0, _a = Object.keys(category.items); _i < _a.length; _i++) {
            var itemKey = _a[_i];
            if (category.items[itemKey] == item) {
                key = key + '/' + itemKey;
            }
        }
        this.af.database.list('/parties').remove(key);
    };
    // Get the firebase key of an items list
    PartyService.prototype.getItemsListKey = function (party, category) {
        return party['$key'] + '/categories/' + category.id + '/items';
    };
    PartyService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2__["a" /* AngularFire */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_angularfire2__["a" /* AngularFire */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__random_service__["a" /* RandomService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__random_service__["a" /* RandomService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__user_service__["a" /* UserService */]) === 'function' && _c) || Object])
    ], PartyService);
    return PartyService;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/chips/src/party.service.js.map

/***/ },

/***/ 238:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return RandomService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RandomService = (function () {
    function RandomService() {
        this.letters = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
            'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
            'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];
    }
    // Generate a random id
    RandomService.prototype.generateId = function (length) {
        if (length === void 0) { length = 6; }
        var id = '';
        for (var i = 0; i < length; i++) {
            id = id + this.letters[Math.floor(Math.random() * this.letters.length)];
        }
        return id;
    };
    RandomService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], RandomService);
    return RandomService;
}());
//# sourceMappingURL=/var/www/chips/src/random.service.js.map

/***/ },

/***/ 358:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppStateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppStateService = (function () {
    function AppStateService() {
        this.openCategories = [];
    }
    // Check if given category is among the open categories
    AppStateService.prototype.categoryIsOpen = function (category) {
        return this.openCategories.indexOf(category.id) > -1;
    };
    // Open or close a category and return true if category is now open
    AppStateService.prototype.toggleCategory = function (category) {
        if (this.categoryIsOpen(category)) {
            this.openCategories.splice(this.openCategories.indexOf(category.id), 1);
            return false;
        }
        else {
            this.openCategories.push(category.id);
            return true;
        }
    };
    AppStateService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], AppStateService);
    return AppStateService;
}());
//# sourceMappingURL=/var/www/chips/src/app-state.service.js.map

/***/ },

/***/ 359:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(721),
            styles: [__webpack_require__(714)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/var/www/chips/src/app.component.js.map

/***/ },

/***/ 422:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 422;


/***/ },

/***/ 423:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app___ = __webpack_require__(534);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_28" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app___["a" /* AppModule */]);
//# sourceMappingURL=/var/www/chips/src/main.js.map

/***/ },

/***/ 530:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__create_create_component__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__party_party_component__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__category_category_component__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__item_item_component__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__user_user_component__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__user_service__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__party_service__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_state_service__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__random_service__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__values_pipe__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__order_by_pipe__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__user_welcome_user_welcome_component__ = __webpack_require__(540);
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



















var appRoutes = [
    { path: 'party/:id', component: __WEBPACK_IMPORTED_MODULE_8__party_party_component__["a" /* PartyComponent */] },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_7__create_create_component__["a" /* CreateComponent */] }
];
var firebaseConfig = {
    apiKey: "AIzaSyCmySpUUIOBGVVl2jg5EqYx2Nm5Dcfd5zA",
    authDomain: "chips-257ca.firebaseapp.com",
    databaseURL: "https://chips-257ca.firebaseio.com",
    storageBucket: "chips-257ca.appspot.com",
    messagingSenderId: "628431259641"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__create_create_component__["a" /* CreateComponent */],
                __WEBPACK_IMPORTED_MODULE_8__party_party_component__["a" /* PartyComponent */],
                __WEBPACK_IMPORTED_MODULE_9__category_category_component__["a" /* CategoryComponent */],
                __WEBPACK_IMPORTED_MODULE_10__item_item_component__["a" /* ItemComponent */],
                __WEBPACK_IMPORTED_MODULE_16__values_pipe__["a" /* ValuesPipe */],
                __WEBPACK_IMPORTED_MODULE_11__user_user_component__["a" /* UserComponent */],
                __WEBPACK_IMPORTED_MODULE_17__order_by_pipe__["a" /* OrderByPipe */],
                __WEBPACK_IMPORTED_MODULE_18__user_welcome_user_welcome_component__["a" /* UserWelcomeComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["c" /* RouterModule */].forRoot(appRoutes),
                __WEBPACK_IMPORTED_MODULE_5_angularfire2__["b" /* AngularFireModule */].initializeApp(firebaseConfig)
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_13__party_service__["a" /* PartyService */],
                __WEBPACK_IMPORTED_MODULE_12__user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_14__app_state_service__["a" /* AppStateService */],
                __WEBPACK_IMPORTED_MODULE_15__random_service__["a" /* RandomService */],
                __WEBPACK_IMPORTED_MODULE_5_angularfire2__["c" /* FIREBASE_PROVIDERS */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/var/www/chips/src/app.module.js.map

/***/ },

/***/ 531:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return categories; });
var categories = {
    aperitif: {
        order: 1,
        id: 'aperitif',
        title: 'apéritif',
        placeholder: 'Guacamole maison'
    },
    first: {
        order: 2,
        id: 'first',
        title: 'entrée',
        placeholder: 'Wiches lorraines'
    },
    main: {
        order: 3,
        id: 'main',
        title: 'plat principal',
        placeholder: 'Gencives de porc'
    },
    cheese: {
        order: 4,
        id: 'cheese',
        title: 'fromage',
        placeholder: 'La Fougne'
    },
    dessert: {
        order: 5,
        id: 'dessert',
        title: 'dessert',
        placeholder: 'Mousse au chocolat'
    },
    alcohols: {
        order: 6,
        id: 'alcohols',
        title: 'alcools',
        placeholder: 'Vodka Martini'
    },
    softs: {
        order: 7,
        id: 'softs',
        title: 'softs',
        placeholder: 'Jus de pomme'
    },
    others: {
        order: 8,
        id: 'others',
        title: 'autres',
        placeholder: 'Cure-dents'
    }
};
//# sourceMappingURL=/var/www/chips/src/categories.js.map

/***/ },

/***/ 532:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__item_item__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__party_service__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_service__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_state_service__ = __webpack_require__(358);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CategoryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CategoryComponent = (function () {
    function CategoryComponent(partyService, userService, appStateService) {
        this.partyService = partyService;
        this.userService = userService;
        this.appStateService = appStateService;
        this.addItemEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* EventEmitter */]();
        this.removeItemEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* EventEmitter */]();
        this.open = false;
        this.newItem = new __WEBPACK_IMPORTED_MODULE_1__item_item__["a" /* Item */]();
    }
    CategoryComponent.prototype.ngOnInit = function () {
        this.open = this.appStateService.categoryIsOpen(this.category);
    };
    // Handle item creation form submission
    CategoryComponent.prototype.submitItem = function () {
        var _this = this;
        if (this.userService.userIsIdentified()) {
            this.addItem();
        }
        else {
            this.userService.identifyUser().subscribe({
                next: function (userIsIdentified) {
                    if (userIsIdentified) {
                        _this.addItem();
                    }
                }
            });
        }
    };
    // Add item into the category
    CategoryComponent.prototype.addItem = function () {
        this.addItemEvent.emit({ item: this.newItem });
        this.newItem = new __WEBPACK_IMPORTED_MODULE_1__item_item__["a" /* Item */]();
    };
    // Remove an item from the category
    CategoryComponent.prototype.onRemoveItem = function (item) {
        this.removeItemEvent.emit({ item: item });
    };
    // Get number of items inside category
    CategoryComponent.prototype.getItemsLength = function () {
        return Object.keys(this.category.items).length;
    };
    // Open and close the category
    CategoryComponent.prototype.toggle = function () {
        this.open = this.appStateService.toggleCategory(this.category);
    };
    // Is the category without item?
    CategoryComponent.prototype.isEmpty = function () {
        return typeof (this.category.items) == 'undefined'
            || this.category.items.length === 0;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Output */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* EventEmitter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* EventEmitter */]) === 'function' && _a) || Object)
    ], CategoryComponent.prototype, "addItemEvent", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Output */])(), 
        __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* EventEmitter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* EventEmitter */]) === 'function' && _b) || Object)
    ], CategoryComponent.prototype, "removeItemEvent", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', Object)
    ], CategoryComponent.prototype, "category", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* HostBinding */])('class.category--open'), 
        __metadata('design:type', Boolean)
    ], CategoryComponent.prototype, "open", void 0);
    CategoryComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-category',
            template: __webpack_require__(722),
            styles: [__webpack_require__(715)]
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__party_service__["a" /* PartyService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__party_service__["a" /* PartyService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__app_state_service__["a" /* AppStateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__app_state_service__["a" /* AppStateService */]) === 'function' && _e) || Object])
    ], CategoryComponent);
    return CategoryComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=/var/www/chips/src/category.component.js.map

/***/ },

/***/ 533:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__party_service__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_service__ = __webpack_require__(87);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CreateComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreateComponent = (function () {
    function CreateComponent(router, partyService, userService) {
        this.router = router;
        this.partyService = partyService;
        this.userService = userService;
    }
    CreateComponent.prototype.ngOnInit = function () {
    };
    // Creation form submission handler
    CreateComponent.prototype.onSubmit = function () {
        var _this = this;
        this.partyService.create(this.title).then(function (party) {
            _this.redirectToParty(party);
        });
    };
    // Redirect to the party page
    CreateComponent.prototype.redirectToParty = function (party) {
        this.router.navigate(['/party', party.getId()]);
    };
    CreateComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-create',
            template: __webpack_require__(723),
            styles: [__webpack_require__(716)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__party_service__["a" /* PartyService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__party_service__["a" /* PartyService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */]) === 'function' && _c) || Object])
    ], CreateComponent);
    return CreateComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/chips/src/create.component.js.map

/***/ },

/***/ 534:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(530);
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });


//# sourceMappingURL=/var/www/chips/src/index.js.map

/***/ },

/***/ 535:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ItemComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ItemComponent = (function () {
    function ItemComponent() {
        this.remove = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* EventEmitter */]();
    }
    ItemComponent.prototype.ngOnInit = function () {
    };
    // Remove the item from its category
    ItemComponent.prototype.onRemove = function () {
        this.remove.emit();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', Object)
    ], ItemComponent.prototype, "item", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Output */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* EventEmitter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* EventEmitter */]) === 'function' && _a) || Object)
    ], ItemComponent.prototype, "remove", void 0);
    ItemComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: '[appItem]',
            template: __webpack_require__(724),
            styles: [__webpack_require__(717)]
        }), 
        __metadata('design:paramtypes', [])
    ], ItemComponent);
    return ItemComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/chips/src/item.component.js.map

/***/ },

/***/ 536:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Item; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Item = (function () {
    function Item() {
    }
    Item.prototype.setUser = function (user) {
        this.user = user;
    };
    // Set timestamp and other useful things before saving
    Item.prototype.beforeSave = function () {
        this.timestamp = Date.now();
    };
    Item = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], Item);
    return Item;
}());
//# sourceMappingURL=/var/www/chips/src/item.js.map

/***/ },

/***/ 537:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return OrderByPipe; });
/*
 * Example use
 *    Basic Array of single type: *ngFor="#todo of todoService.todos | orderBy : '-'"
 *    Multidimensional Array Sort on single column: *ngFor="#todo of todoService.todos | orderBy : ['-status']"
 *    Multidimensional Array Sort on multiple columns: *ngFor="#todo of todoService.todos | orderBy : ['status', '-title']"
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var OrderByPipe = (function () {
    function OrderByPipe() {
    }
    OrderByPipe._orderByComparator = function (a, b) {
        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            //Isn't a number so lowercase the string to properly compare
            if (a.toLowerCase() < b.toLowerCase())
                return -1;
            if (a.toLowerCase() > b.toLowerCase())
                return 1;
        }
        else {
            //Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b))
                return -1;
            if (parseFloat(a) > parseFloat(b))
                return 1;
        }
        return 0; //equal each other
    };
    OrderByPipe.prototype.transform = function (input, _a) {
        var _b = _a[0], config = _b === void 0 ? '+' : _b;
        if (!Array.isArray(input))
            return input;
        if (!Array.isArray(config) || (Array.isArray(config) && config.length == 1)) {
            var propertyToCheck = !Array.isArray(config) ? config : config[0];
            var desc = propertyToCheck.substr(0, 1) == '-';
            //Basic array
            if (!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+') {
                return !desc ? input.sort() : input.sort().reverse();
            }
            else {
                var property = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;
                return input.sort(function (a, b) {
                    return !desc
                        ? OrderByPipe._orderByComparator(a[property], b[property])
                        : -OrderByPipe._orderByComparator(a[property], b[property]);
                });
            }
        }
        else {
            //Loop over property of the array in order and sort
            return input.sort(function (a, b) {
                for (var i = 0; i < config.length; i++) {
                    var desc = config[i].substr(0, 1) == '-';
                    var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                        ? config[i].substr(1)
                        : config[i];
                    var comparison = !desc
                        ? OrderByPipe._orderByComparator(a[property], b[property])
                        : -OrderByPipe._orderByComparator(a[property], b[property]);
                    //Don't return 0 yet in case of needing to sort by next property
                    if (comparison != 0)
                        return comparison;
                }
                return 0; //equal each other
            });
        }
    };
    OrderByPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* Pipe */])({ name: 'orderBy', pure: false }), 
        __metadata('design:paramtypes', [])
    ], OrderByPipe);
    return OrderByPipe;
}());
//# sourceMappingURL=/var/www/chips/src/order-by.pipe.js.map

/***/ },

/***/ 538:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__party_service__ = __webpack_require__(159);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return PartyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PartyComponent = (function () {
    function PartyComponent(route, partyService) {
        this.route = route;
        this.partyService = partyService;
        this.urlCopied = false;
    }
    PartyComponent.prototype.ngOnInit = function () {
        this.getParty();
        this.url = this.getPageUrl();
    };
    PartyComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    // Get party based on the url
    PartyComponent.prototype.getParty = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            _this.partyService.get(params.id).subscribe(function (parties) {
                _this.party = parties[0];
            });
        });
    };
    // Get current page url
    PartyComponent.prototype.getPageUrl = function () {
        var location = document.location;
        return location.host + location.pathname;
    };
    // Add an item to a category
    PartyComponent.prototype.addItem = function ($event, category) {
        this.partyService.addItem(this.party, category, $event.item);
    };
    // Remove an item from a category
    PartyComponent.prototype.removeItem = function ($event, category) {
        this.partyService.removeItem(this.party, category, $event.item);
    };
    // Copy party URL to clipboard
    PartyComponent.prototype.copyUrl = function () {
        var range = document.createRange();
        var selection = window.getSelection();
        selection.removeAllRanges();
        range.selectNodeContents(this.partyUrl.nativeElement);
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
        this.urlCopied = true;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ViewChild */])("partyUrl"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */]) === 'function' && _a) || Object)
    ], PartyComponent.prototype, "partyUrl", void 0);
    PartyComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-party',
            template: __webpack_require__(725),
            styles: [__webpack_require__(718)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__party_service__["a" /* PartyService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__party_service__["a" /* PartyService */]) === 'function' && _c) || Object])
    ], PartyComponent);
    return PartyComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/var/www/chips/src/party.component.js.map

/***/ },

/***/ 539:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__categories__ = __webpack_require__(531);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Party; });

var Party = (function () {
    function Party(id, title) {
        this.categories = __WEBPACK_IMPORTED_MODULE_0__categories__["a" /* categories */];
        this.id = id;
        this.title = title;
    }
    Party.prototype.getId = function () {
        return this.id;
    };
    return Party;
}());
//# sourceMappingURL=/var/www/chips/src/party.js.map

/***/ },

/***/ 540:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_service__ = __webpack_require__(87);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UserWelcomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserWelcomeComponent = (function () {
    function UserWelcomeComponent(userService) {
        this.userService = userService;
    }
    UserWelcomeComponent.prototype.ngOnInit = function () {
        this.waitForIdentification();
    };
    // Get user one he's identified
    UserWelcomeComponent.prototype.waitForIdentification = function () {
        var _this = this;
        this.userService.waitForIdentification().subscribe({
            next: function (userIsIdentified) {
                if (userIsIdentified) {
                    _this.user = _this.userService.getUser();
                }
            }
        });
    };
    // Update user profile
    UserWelcomeComponent.prototype.update = function () {
        this.userService.update();
    };
    UserWelcomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-user-welcome',
            template: __webpack_require__(726),
            styles: [__webpack_require__(719)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__user_service__["a" /* UserService */]) === 'function' && _a) || Object])
    ], UserWelcomeComponent);
    return UserWelcomeComponent;
    var _a;
}());
//# sourceMappingURL=/var/www/chips/src/user-welcome.component.js.map

/***/ },

/***/ 541:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_service__ = __webpack_require__(87);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserComponent = (function () {
    function UserComponent(userService) {
        this.userService = userService;
        this.visible = false;
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getIdentificationSubject().subscribe({
            next: function (userIsIdentified) {
                if (userIsIdentified) {
                    _this.hideComponent();
                }
                else {
                    _this.showComponent();
                }
            }
        });
    };
    // Show the component and focus on the main field
    UserComponent.prototype.showComponent = function () {
        var _this = this;
        this.visible = true;
        setTimeout(function () {
            _this.userNameInput.nativeElement.focus();
        });
    };
    // Hide the component
    UserComponent.prototype.hideComponent = function () {
        this.visible = false;
    };
    // Save user identify
    UserComponent.prototype.saveUserIdentity = function () {
        this.userService.saveUserIdentity(this.userName);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* HostBinding */])('class.user--visible'), 
        __metadata('design:type', Boolean)
    ], UserComponent.prototype, "visible", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ViewChild */])("userNameInput"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */]) === 'function' && _a) || Object)
    ], UserComponent.prototype, "userNameInput", void 0);
    UserComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: '[appUser]',
            template: __webpack_require__(727),
            styles: [__webpack_require__(720)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__user_service__["a" /* UserService */]) === 'function' && _b) || Object])
    ], UserComponent);
    return UserComponent;
    var _a, _b;
}());
//# sourceMappingURL=/var/www/chips/src/user.component.js.map

/***/ },

/***/ 542:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__random_service__ = __webpack_require__(238);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return User; });

var User = (function () {
    function User(name) {
        var randomService = new __WEBPACK_IMPORTED_MODULE_0__random_service__["a" /* RandomService */]();
        this.id = randomService.generateId(12);
        this.name = name;
    }
    User.prototype.getId = function () {
        return this.id;
    };
    return User;
}());
//# sourceMappingURL=/var/www/chips/src/user.js.map

/***/ },

/***/ 543:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ValuesPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ValuesPipe = (function () {
    function ValuesPipe() {
    }
    ValuesPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        if (value) {
            return Object.keys(value).map(function (key) { return value[key]; });
        }
        return [];
    };
    ValuesPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* Pipe */])({
            name: 'values'
        }), 
        __metadata('design:paramtypes', [])
    ], ValuesPipe);
    return ValuesPipe;
}());
//# sourceMappingURL=/var/www/chips/src/values.pipe.js.map

/***/ },

/***/ 544:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/var/www/chips/src/environment.js.map

/***/ },

/***/ 545:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(561);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(562);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(556);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(999);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/var/www/chips/src/polyfills.js.map

/***/ },

/***/ 714:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 715:
/***/ function(module, exports) {

module.exports = ":host {\n  display: block;\n  position: relative;\n  text-align: center;\n}\n\n:host:before {\n  content: '>';\n  -webkit-transform: rotate(-90deg);\n          transform: rotate(-90deg);\n  color: white;\n  font-weight: bold;\n  position: absolute;\n  left: 8px;\n  top: 6px;\n  font-size: 2rem;\n  -webkit-transition: -webkit-transform 0.3s;\n  transition: -webkit-transform 0.3s;\n  transition: transform 0.3s;\n  transition: transform 0.3s, -webkit-transform 0.3s;\n}\n\n:host.category--open:before {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.category__title {\n  background-color: #f0ad4e;\n  border-radius: 5px;\n  padding: 8px;\n  cursor: pointer;\n}\n\n.category__count {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  font-size: 2rem;\n  background-color: white;\n  position: absolute;\n  right: 5px;\n  top: 5px;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  font-weight: bold;\n}\n\n.category__content {\n  max-height: 0;\n  overflow: hidden;\n}\n\n:host.category--open .category__content {\n  max-height: none;\n}\n\n.category__newItemInput {\n  display: block;\n  margin: 20px auto 10px;\n  font-size: 1.8rem;\n  text-align: center;\n}\n"

/***/ },

/***/ 716:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 717:
/***/ function(module, exports) {

module.exports = ":host {\n  position: relative;\n  padding: 15px 40px;\n  text-align: center;\n  border-bottom: 1px solid black;\n}\n\n.item__title {\n  font-size: 1.8rem;\n}\n\n.item__user {\n  color: #666;\n}\n\n.item__actions {\n  position: absolute;\n  right: 0;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n\n.item__remove {\n  font-weight: bold;\n}"

/***/ },

/***/ 718:
/***/ function(module, exports) {

module.exports = ".party__share {\n  margin: 10px auto;\n  text-align: center;\n  font-size: 1.6rem;\n}\n\n.party__url {\n  font-weight: bold;\n}\n\n.party__copy {\n  margin: 10px auto;\n}"

/***/ },

/***/ 719:
/***/ function(module, exports) {

module.exports = ".userWelcome__inner {\n  font-size: 1.4rem;\n  padding: 10px 0;\n  border-bottom: 3px solid #666;\n}\n\n.userWelcome__name {\n  font-weight: bold;\n}\n\n.userWelcome__edit {\n  margin-left: 10px;\n  color: black;\n}\n"

/***/ },

/***/ 720:
/***/ function(module, exports) {

module.exports = ":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  visibility: hidden;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  -webkit-transition: opacity 0.3s;\n  transition: opacity 0.3s;\n  background: rgba(0, 0, 0, 0.8);\n  text-align: center;\n  z-index: 1;\n  opacity: 0;\n}\n\n:host.user--visible {\n  opacity: 1;\n  visibility: visible;\n}\n\n.user__cancel {\n  position: fixed;\n  top: 10px;\n  right: 10px;\n  color: white;\n  font-size: 2rem;\n}\n\n.user__intro {\n  color: white;\n  font-size: 2rem;\n}\n\n.user__actions {\n  margin-top: 10px;\n}\n"

/***/ },

/***/ 721:
/***/ function(module, exports) {

module.exports = "<section appUser></section>\n\n<app-user-welcome></app-user-welcome>\n\n<router-outlet></router-outlet>"

/***/ },

/***/ 722:
/***/ function(module, exports) {

module.exports = "<h3 class=\"category__title text-capitalize text-center\" (click)=\"toggle()\">\n  {{category.title}}\n</h3>\n<div *ngIf=\"category.items\" class=\"category__count\">\n  <span>{{getItemsLength()}}</span>\n</div>\n\n<div class=\"category__content\">\n  <ul>\n    <li appItem\n      *ngFor=\"let item of category.items | values | orderBy: ['timestamp']\"\n      [item]=\"item\"\n      (remove)=\"onRemoveItem(item)\">\n    </li>\n  </ul>\n  <p *ngIf=\"isEmpty()\">Rien pour le moment</p>\n\n  <form (ngSubmit)=\"submitItem()\">\n    <input\n      [(ngModel)]=\"newItem.title\"\n      name=\"itemTitle\"\n      class=\"category__newItemInput\"\n      [placeholder]=\"category.placeholder\"\n      required\n    >\n    <input type=\"submit\" class=\"caregory__newItemSubmit btn btn-primary\">\n  </form>\n</div>"

/***/ },

/***/ 723:
/***/ function(module, exports) {

module.exports = "<h1>Créer une rencontre</h1>\n\n<form (ngSubmit)=\"onSubmit()\">\n  <input [(ngModel)]=\"title\" name=\"partyTitle\" required>\n  <input type=\"submit\"> \n</form>\n"

/***/ },

/***/ 724:
/***/ function(module, exports) {

module.exports = "<p class=\"item__title\">{{item.title}}</p>\n<p class=\"item__user\">Ajouté par {{item.user.name}}</p>\n\n<form (ngSubmit)=\"onRemove()\" class=\"item__actions\">\n  <input type=\"submit\" value=\"X\" class=\"btn btn-danger btn-sm item__remove\">\n</form>\n"

/***/ },

/***/ 725:
/***/ function(module, exports) {

module.exports = "<div *ngIf=\"party\">\n  <h1 class=\"text-center\">{{party.title}}</h1>\n\n  <div class=\"party__share\">\n    Partagez cet événement :\n    <div class=\"party__url\" #partyUrl>{{url}}</div>\n    <button (click)=\"copyUrl()\" class=\"btn btn-primary party__copy\">\n      <span class=\"glyphicon glyphicon-copy\"></span>\n      <span *ngIf=\"!urlCopied\">Copier l'URL</span>\n      <span *ngIf=\"urlCopied\">URL copiée !</span>\n    </button>\n  </div>\n\n    <app-category\n      *ngFor=\"let category of party.categories | values | orderBy: ['order']\"\n      [category]=\"category\"\n      (addItemEvent)=\"addItem($event, category)\"\n      (removeItemEvent)=\"removeItem($event, category)\"\n    ></app-category>\n</div>\n"

/***/ },

/***/ 726:
/***/ function(module, exports) {

module.exports = "<div *ngIf=\"user\" class=\"userWelcome__inner\">\n  Bienvenue <span class=\"userWelcome__name\">{{user.name}}</span>\n  <button (click)=\"update()\" class=\"userWelcome__edit btn\">\n    <span class=\"glyphicon glyphicon-pencil\"></span>\n  </button>\n</div>\n"

/***/ },

/***/ 727:
/***/ function(module, exports) {

module.exports = "<div class=\"user__inner\">\n  <span \n    (click)=\"hideComponent()\"\n    class=\"user__cancel glyphicon glyphicon-remove\"\n  ></span>\n  <p class=\"user__intro\">Un p'tit nom ?</p>\n  <form (ngSubmit)=\"saveUserIdentity()\">\n    <input [(ngModel)]=\"userName\" name=\"name\" required #userNameInput>\n    <div class=\"user__actions\">\n      <input type=\"submit\" class=\"btn btn-primary\">\n    </div>\n  </form>\n</div>\n"

/***/ },

/***/ 87:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cookies_ng2_cookies__ = __webpack_require__(711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_cookies_ng2_cookies___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_cookies_ng2_cookies__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user__ = __webpack_require__(542);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserService = (function () {
    function UserService(af) {
        this.af = af;
        this.identificationSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["Subject"]();
        if (this.userIsIdentified()) {
            this.fetchUser();
        }
    }
    UserService.prototype.getUser = function () {
        return this.user;
    };
    // Return the identification subject to watch identification process
    UserService.prototype.getIdentificationSubject = function () {
        return this.identificationSubject;
    };
    // Check if user informations exist
    UserService.prototype.userIsIdentified = function () {
        return __WEBPACK_IMPORTED_MODULE_1_ng2_cookies_ng2_cookies__["Cookie"].get('userId') != null;
    };
    // Ask for user identification if needed
    UserService.prototype.identifyUser = function () {
        this.identificationSubject.next(false);
        return this.identificationSubject;
    };
    // Wait for user identification
    UserService.prototype.waitForIdentification = function () {
        return this.identificationSubject;
    };
    // Save user identify
    UserService.prototype.saveUserIdentity = function (userName) {
        var _this = this;
        this.user = new __WEBPACK_IMPORTED_MODULE_4__user_user__["a" /* User */](userName);
        __WEBPACK_IMPORTED_MODULE_1_ng2_cookies_ng2_cookies__["Cookie"].set('userId', this.user.getId(), 365, '/');
        this.af.database.list('/users').push(this.user).then(function () {
            _this.identificationSubject.next(true);
        });
    };
    // Fetch user
    UserService.prototype.fetchUser = function () {
        var _this = this;
        this.af.database.list('/users', {
            query: {
                orderByChild: 'id',
                equalTo: this.getUserId()
            }
        }).subscribe(function (users) {
            _this.user = users[0];
            _this.identificationSubject.next(true);
        });
    };
    // Get a user object reduced to its basic properties
    UserService.prototype.getBasicUser = function () {
        return {
            "id": this.user.id,
            "name": this.user.name
        };
    };
    // Get the current user id
    UserService.prototype.getUserId = function () {
        return __WEBPACK_IMPORTED_MODULE_1_ng2_cookies_ng2_cookies__["Cookie"].get('userId');
    };
    // Update the user
    UserService.prototype.update = function () {
        this.identificationSubject.next(false);
    };
    UserService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_angularfire2__["a" /* AngularFire */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angularfire2__["a" /* AngularFire */]) === 'function' && _a) || Object])
    ], UserService);
    return UserService;
    var _a;
}());
//# sourceMappingURL=/var/www/chips/src/user.service.js.map

/***/ }

},[1000]);
//# sourceMappingURL=main.bundle.map