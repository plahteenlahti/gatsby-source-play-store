"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var store = require("google-play-scraper");

exports.sourceNodes = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, _ref2) {
    var actions, createContentDigest, createNodeId, apps, country, createNode, appList, promises, appReviews;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            actions = _ref.actions, createContentDigest = _ref.createContentDigest, createNodeId = _ref.createNodeId;
            apps = _ref2.apps, country = _ref2.country;
            createNode = actions.createNode;
            _context.prev = 3;
            appList = apps || ["app.sleepcircle.application"];
            promises = [];
            appList.forEach(function (app) {
              promises.push(getReviews(app, country));
            });
            _context.next = 9;
            return Promise.all(promises);

          case 9:
            appReviews = _context.sent;
            appReviews.forEach(function (app) {
              var _appNode;

              var appNode = (_appNode = {
                id: createNodeId("app-" + app.id),
                parent: "__SOURCE__",
                internal: {
                  type: "PlayStoreApp",
                  contentDigest: createContentDigest({
                    key: app.id,
                    foo: app.url,
                    bar: app.title
                  })
                },
                children: []
              }, _appNode["id"] = "" + app.id, _appNode.appId = app.appId, _appNode.title = app.title, _appNode.url = app.url, _appNode.description = app.description, _appNode.icon = app.icon, _appNode.genres = app.genres, _appNode.genreIds = app.genreIds, _appNode.primaryGenre = app.primaryGenre, _appNode.primaryGenreId = app.primaryGenreId, _appNode.contentRating = app.contentRating, _appNode.languages = app.languages, _appNode.size = app.size, _appNode.requiredOsVersion = app.requiredOsVersion, _appNode.released = app.released, _appNode.updated = app.updated, _appNode.releaseNotes = app.releaseNotes, _appNode.version = app.version, _appNode.price = app.price, _appNode.currency = app.currency, _appNode.free = app.free, _appNode.developerId = app.developerId, _appNode.developer = app.developer, _appNode.developerUrl = app.developerUrl, _appNode.developerWebsite = app.developerWebsite, _appNode.score = app.score, _appNode.reviews = app.reviews, _appNode.currentVersionScore = app.currentVersionScore, _appNode.currentVersionReviews = app.currentVersionReviews, _appNode);
              createNode(appNode);
              if (!app.reviews) return;
              app.reviews.forEach(function (review) {
                var fieldData = {
                  key: review.id,
                  foo: review.url,
                  bar: review.app
                };
                var reviewNode = {
                  id: createNodeId("review-" + review.id),
                  parent: "__SOURCE__",
                  internal: {
                    type: "PlayStoreReview",
                    contentDigest: createContentDigest(fieldData)
                  },
                  children: [],
                  title: review.title,
                  text: review.text,
                  version: review.version,
                  url: review.url,
                  userUrl: review.userUrl,
                  userName: review.userName,
                  score: review.score,
                  appId: review.appId
                };
                createNode(reviewNode);
              });
            });
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](3);
            console.error(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 13]]);
  }));

  return function (_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();

var getReviews = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(appId, country) {
    var page, allReviews, app, reviews, addApp;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            page = 0;
            allReviews = []; // Apple only allows fetching of 10 pages

            _context2.next = 5;
            return store.app({
              appId: appId,
              country: country,
              throttle: 10
            });

          case 5:
            app = _context2.sent;

          case 6:
            if (!(page < 10)) {
              _context2.next = 15;
              break;
            }

            _context2.next = 9;
            return store.reviews({
              appId: appId,
              country: country,
              sort: store.sort.HELPFUL,
              page: page
            });

          case 9:
            reviews = _context2.sent;
            addApp = reviews.map(function (review) {
              return (0, _extends2["default"])({}, review, {
                appId: appId,
                throttle: 10
              });
            });
            allReviews.push.apply(allReviews, addApp);
            page++;
            _context2.next = 6;
            break;

          case 15:
            return _context2.abrupt("return", (0, _extends2["default"])({}, app, {
              reviews: allReviews
            }));

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
            return _context2.abrupt("return", []);

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 18]]);
  }));

  return function getReviews(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();