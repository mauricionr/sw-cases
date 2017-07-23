/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [
    ["/favicon-16x16.png", "f951a8b7aab9790ffda0189bf10541da"],
    ["/favicon-32x32.png", "1528ce1875723c9ffba4722cf9d6e974"],
    ["/index.html", "c3301d782ceda9c9230c2beee939f150"],
    ["/static/build/033481935b4d3075ede6fbfce626f187.svg", "033481935b4d3075ede6fbfce626f187"],
    ["/static/build/04da95cfb58bc3e5669617b7c18df6d6.svg", "04da95cfb58bc3e5669617b7c18df6d6"],
    ["/static/build/06a7b4491938e3b9cf7b68834af0926a.png", "06a7b4491938e3b9cf7b68834af0926a"],
    ["/static/build/06e6fab67c9516554ea63a67a24809c7.png", "06e6fab67c9516554ea63a67a24809c7"],
    ["/static/build/08688e6371652493a2f42c05cd16c600.svg", "08688e6371652493a2f42c05cd16c600"],
    ["/static/build/091ead033c9949ff262e6987aad6eec3.svg", "091ead033c9949ff262e6987aad6eec3"],
    ["/static/build/094e7e4e625de01f8b93d58e0fad4fc2.svg", "094e7e4e625de01f8b93d58e0fad4fc2"],
    ["/static/build/0e471cf2a35fef69085257f0b44f2438.svg", "0e471cf2a35fef69085257f0b44f2438"],
    ["/static/build/0ed476fb4461eba4f4bed1a7cfd62e5b.svg", "0ed476fb4461eba4f4bed1a7cfd62e5b"],
    ["/static/build/0fbb78cd2b2cc450fb79c03a1530bc1d.svg", "0fbb78cd2b2cc450fb79c03a1530bc1d"],
    ["/static/build/0fe53c106592d045a7d70f53b658100a.svg", "0fe53c106592d045a7d70f53b658100a"],
    ["/static/build/133f6e85012383bcaabdfc49836751da.jpeg", "133f6e85012383bcaabdfc49836751da"],
    ["/static/build/16cbfe55045be5f6f2375b03fd80037a.svg", "16cbfe55045be5f6f2375b03fd80037a"],
    ["/static/build/16f98387a8b162dda77cd712c3084a5f.jpeg", "16f98387a8b162dda77cd712c3084a5f"],
    ["/static/build/1857898fccb39663b29a53f92429c10c.svg", "1857898fccb39663b29a53f92429c10c"],
    ["/static/build/1b179917d53c00b562f9c8d03cf08650.svg", "1b179917d53c00b562f9c8d03cf08650"],
    ["/static/build/2511d1f349e12935ba035eaf315cf1ce.png", "2511d1f349e12935ba035eaf315cf1ce"],
    ["/static/build/2540f08f44778983522d69fd205e4983.png", "2540f08f44778983522d69fd205e4983"],
    ["/static/build/2967bbe11851be59e5e897b0214662b8.png", "2967bbe11851be59e5e897b0214662b8"],
    ["/static/build/2cb8e6fd8d70cce5ccb7d23d11178156.svg", "2cb8e6fd8d70cce5ccb7d23d11178156"],
    ["/static/build/2d7e1b84dd165dd8db35d17526e8a237.jpeg", "2d7e1b84dd165dd8db35d17526e8a237"],
    ["/static/build/2e0b534d971ee9c37d063710e90a39f3.jpeg", "2e0b534d971ee9c37d063710e90a39f3"],
    ["/static/build/2ea96bf0124db287c41cb410e8519e8b.png", "2ea96bf0124db287c41cb410e8519e8b"],
    ["/static/build/2f6b949e4dbcdc26c7e54a0a98eac922.svg", "2f6b949e4dbcdc26c7e54a0a98eac922"],
    ["/static/build/335f548d4e04630cc709e1b8c741fa7f.jpeg", "335f548d4e04630cc709e1b8c741fa7f"],
    ["/static/build/3686dd129fefbcc068571c002a820a8b.svg", "3686dd129fefbcc068571c002a820a8b"],
    ["/static/build/370247723bdd5562af5a661d277a8c08.jpeg", "370247723bdd5562af5a661d277a8c08"],
    ["/static/build/371c1bd0b4038007e6865ddcce33c3c3.svg", "371c1bd0b4038007e6865ddcce33c3c3"],
    ["/static/build/378281aa8899b51b1fb7bf5e97cf9066.svg", "378281aa8899b51b1fb7bf5e97cf9066"],
    ["/static/build/37f6ae66325ec3aa1273473607ea3386.svg", "37f6ae66325ec3aa1273473607ea3386"],
    ["/static/build/3b5918b56d94f8406e1e066bdac92fd2.svg", "3b5918b56d94f8406e1e066bdac92fd2"],
    ["/static/build/3c558e748bf8e369651129e4700b0599.svg", "3c558e748bf8e369651129e4700b0599"],
    ["/static/build/3e344ae76bdd046b5605488767ee623c.png", "3e344ae76bdd046b5605488767ee623c"],
    ["/static/build/3f1522f57b95e3e36215cf292cf6b7a8.svg", "3f1522f57b95e3e36215cf292cf6b7a8"],
    ["/static/build/42ddc5273e53b21c1f1131cddfdcd5ef.png", "42ddc5273e53b21c1f1131cddfdcd5ef"],
    ["/static/build/4478563f75b3d15311df218928884ad9.jpeg", "4478563f75b3d15311df218928884ad9"],
    ["/static/build/44b6f4ecff66119e9696e0c52342b487.svg", "44b6f4ecff66119e9696e0c52342b487"],
    ["/static/build/477837e3452d4dd877a3110532abdc83.png", "477837e3452d4dd877a3110532abdc83"],
    ["/static/build/518d509dec31141db09997f4742b4c1e.jpeg", "518d509dec31141db09997f4742b4c1e"],
    ["/static/build/53cb19fdb0526eda896c6e0451e09b1d.png", "53cb19fdb0526eda896c6e0451e09b1d"],
    ["/static/build/5c53ed71fc5042082d8a8e0a3086c278.svg", "5c53ed71fc5042082d8a8e0a3086c278"],
    ["/static/build/606663ca72184ac254e16eaa54bf0cde.png", "606663ca72184ac254e16eaa54bf0cde"],
    ["/static/build/62a6db5b6955d38d3f6285b6df0506ba.svg", "62a6db5b6955d38d3f6285b6df0506ba"],
    ["/static/build/6712e0481b656c85a857bb55d98024e2.svg", "6712e0481b656c85a857bb55d98024e2"],
    ["/static/build/673f4fc5dce52e1eb9f726a9ce1bcd33.svg", "673f4fc5dce52e1eb9f726a9ce1bcd33"],
    ["/static/build/699a910424f50d3d3b9c1bf7657845e7.svg", "699a910424f50d3d3b9c1bf7657845e7"],
    ["/static/build/6b1b38c23dcfe5285082174a1e864cc9.svg", "6b1b38c23dcfe5285082174a1e864cc9"],
    ["/static/build/7368cf35026fef1a5c193e7db894f7d6.svg", "7368cf35026fef1a5c193e7db894f7d6"],
    ["/static/build/76d264dd068bbe8ac7eac5c424498c7f.svg", "76d264dd068bbe8ac7eac5c424498c7f"],
    ["/static/build/794b3c2c846b9e0f083609a4cce85305.svg", "794b3c2c846b9e0f083609a4cce85305"],
    ["/static/build/7b78ccf6e0fe9561a45e9e028521b392.svg", "7b78ccf6e0fe9561a45e9e028521b392"],
    ["/static/build/7bb38ef8c2c9bd510f8987dd9ef98ff5.png", "7bb38ef8c2c9bd510f8987dd9ef98ff5"],
    ["/static/build/7bc02f285dd7e8a21181a824d42834b0.png", "7bc02f285dd7e8a21181a824d42834b0"],
    ["/static/build/7c377dcc14796d9f8ce66132b6ce85f6.svg", "7c377dcc14796d9f8ce66132b6ce85f6"],
    ["/static/build/7ccaa0af25f95a4635944de86bb74ac7.svg", "7ccaa0af25f95a4635944de86bb74ac7"],
    ["/static/build/7e8da2793956e0b0044b7446cc7bbd35.png", "7e8da2793956e0b0044b7446cc7bbd35"],
    ["/static/build/80ab7bdae3b4132925e4bcf99b6aa46a.svg", "80ab7bdae3b4132925e4bcf99b6aa46a"],
    ["/static/build/8825635134e242980a04fe84e41111a6.svg", "8825635134e242980a04fe84e41111a6"],
    ["/static/build/88dc306b472d183555bf38abdef0f195.svg", "88dc306b472d183555bf38abdef0f195"],
    ["/static/build/8ad3e8a25db32840cbacad916ee1baf4.png", "8ad3e8a25db32840cbacad916ee1baf4"],
    ["/static/build/8b1f4e7cf61ea55cb56ff7f7c2386114.jpeg", "8b1f4e7cf61ea55cb56ff7f7c2386114"],
    ["/static/build/8d28301fd97484af0b0c74d3124ad123.svg", "8d28301fd97484af0b0c74d3124ad123"],
    ["/static/build/9736ee55bfc3b6ec5674ecf19676c26c.png", "9736ee55bfc3b6ec5674ecf19676c26c"],
    ["/static/build/98de56639564898e607354a8fb39d6d2.svg", "98de56639564898e607354a8fb39d6d2"],
    ["/static/build/9a5667a63eda040c8b4f9eb2fd5e93a2.svg", "9a5667a63eda040c8b4f9eb2fd5e93a2"],
    ["/static/build/9aaec88d3768447f90a4ee6460b6be9d.svg", "9aaec88d3768447f90a4ee6460b6be9d"],
    ["/static/build/9ba4167d6ff393fcfce92baa26b127f3.svg", "9ba4167d6ff393fcfce92baa26b127f3"],
    ["/static/build/9e02eb1c4ef44491718ff493d70ab12a.png", "9e02eb1c4ef44491718ff493d70ab12a"],
    ["/static/build/9f27ac9a74e0fc1025d177488a5f56c8.png", "9f27ac9a74e0fc1025d177488a5f56c8"],
    ["/static/build/9fbe5bf565f5a3791d63f49dd35bb507.svg", "9fbe5bf565f5a3791d63f49dd35bb507"],
    ["/static/build/a2832a5045bc19930fac936e533becbf.png", "a2832a5045bc19930fac936e533becbf"],
    ["/static/build/a7c3037313ca968b8eb59849c6430353.svg", "a7c3037313ca968b8eb59849c6430353"],
    ["/static/build/ad061a93f4be159615e051e0de8a1740.jpeg", "ad061a93f4be159615e051e0de8a1740"],
    ["/static/build/adf76e429348620183a510bd15c5dc21.png", "adf76e429348620183a510bd15c5dc21"],
    ["/static/build/b65e6a35c578eb21f38f6207be8d2569.svg", "b65e6a35c578eb21f38f6207be8d2569"],
    ["/static/build/b672ef6019be825e6af4e1d2b80f0881.svg", "b672ef6019be825e6af4e1d2b80f0881"],
    ["/static/build/c0543e93f24911e07338eefef63c67a2.svg", "c0543e93f24911e07338eefef63c67a2"],
    ["/static/build/c1bff8eff49778f75e394cef36d7dde6.svg", "c1bff8eff49778f75e394cef36d7dde6"],
    ["/static/build/c26e514ed9cd261d70dc7e4cdbf2555c.svg", "c26e514ed9cd261d70dc7e4cdbf2555c"],
    ["/static/build/cacb45e865f6abbd97765ba56d824465.svg", "cacb45e865f6abbd97765ba56d824465"],
    ["/static/build/cf91d05f2b35f12c07a813042a166931.jpeg", "cf91d05f2b35f12c07a813042a166931"],
    ["/static/build/chunks/pc-r-Chat-47372e6951fb85d9156f.js", "c67bbc52383a1444c57941d9fbd49dc3"],
    ["/static/build/chunks/pc-r-ChatProfile-e3184192985e155c744e.js", "ee5df62c9dc85770827e1504fe075909"],
    ["/static/build/chunks/pc-r-DesktopChat-dc2bebe327f615f4202c.js", "f2d28774f3a7adb5dc6f5cc956ca3eca"],
    ["/static/build/chunks/pc-r-DesktopMessageList-acec5ea7ede0c0383cf3.js", "296a935fbdb1e8a36e0ef42c2117f30e"],
    ["/static/build/chunks/pc-r-EditProfileGenderPage-c383f2f2165bab937d0b.js", "fda0ba7f2c8e41ecf2a63f7c79c98464"],
    ["/static/build/chunks/pc-r-EditProfileMenuPage-53378be62e737159da61.js", "a12c80b0e29f1e444130bf8355d1f493"],
    ["/static/build/chunks/pc-r-EditProfileSchoolPage-42a7c597800ff03cd2bb.js", "ca8abc9958bd55466d8b9a866538f0e9"],
    ["/static/build/chunks/pc-r-EditProfileWorkPage-64a5a270d3796f0faf65.js", "9520a624b5e862acfeb08e1da1001eaf"],
    ["/static/build/chunks/pc-r-FacebookPhotoPicker-4c36acedec0e935e8525.js", "9dc52d3b3b14896529630cb9aaa42690"],
    ["/static/build/chunks/pc-r-LoginDesktopAside-e45b56a3f40051711b17.js", "3ba68132d742e2b3a4c94227bdb39340"],
    ["/static/build/chunks/pc-r-LoginDesktopMain-522e3d8ec87c5df679ad.js", "2cb6d2d910dff0da70a6cbac90d52dc6"],
    ["/static/build/chunks/pc-r-LoginMobile-eaf413d14658bbcc8a81.js", "99968c4043156b1ddd0ff4b54844f69f"],
    ["/static/build/chunks/pc-r-MatchlistPage-5e3b555e0f1b9e1b48d7.js", "20ee63b31f971a46341007833481ff78"],
    ["/static/build/chunks/pc-r-NotFoundPage-9c8782b6b4cdb236f7be.js", "be47afe8f5a85cf9b23c201f0431ecd3"],
    ["/static/build/chunks/pc-r-PhotoEditor-317c55d29a634238908b.js", "15ad681fc16ab3ba5b37ca5f963530bd"],
    ["/static/build/chunks/pc-r-ProfilePage-21166e9a2899c7db378e.js", "7c678cb27fd1a2d26c06ed53f7345f22"],
    ["/static/build/chunks/pc-r-RecProfile-4e4ce0f82e75c9b9394b.js", "2ec2da6b38b8a98cb05a1f6d99df161a"],
    ["/static/build/chunks/pc-r-SearchGenders-b7c40dd2557ba8821bec.js", "c97805b640019f5e666053d4b8e13f4e"],
    ["/static/build/chunks/pc-r-ServiceUnavailablePage-cb79dc511cae92080cb8.js", "f65b434e16608cc7ca783bacc50e6e88"],
    ["/static/build/chunks/pc-r-Settings-813599c1c0706bbee4d0.js", "317bb639761507814a3408a35e725b81"],
    ["/static/build/chunks/pc-r-SubSettings-f0776cefe741819f7e6a.js", "cf6f166e76e0c806d7d60080934a50e0"],
    ["/static/build/chunks/pc-r-UserVerification-8081ce484be513d28dad.js", "3bf6f48b7c0edd290dd89e3957e8e04b"],
    ["/static/build/d9082867442774287641220db6e90f21.svg", "d9082867442774287641220db6e90f21"],
    ["/static/build/d9a047d8d3cd84529b7d7ed5278dc06a.svg", "d9a047d8d3cd84529b7d7ed5278dc06a"],
    ["/static/build/dbac876e18da62a1614daf2f79411762.svg", "dbac876e18da62a1614daf2f79411762"],
    ["/static/build/dfeb43fedf80bb89e9db942bdb888c3d.svg", "dfeb43fedf80bb89e9db942bdb888c3d"],
    ["/static/build/dfec37cb356b1a4051dbb96cf4adcc0c.svg", "dfec37cb356b1a4051dbb96cf4adcc0c"],
    ["/static/build/e372e43ce25783e7d8ffad7dc8f8e910.png", "e372e43ce25783e7d8ffad7dc8f8e910"],
    ["/static/build/e41e62106d6bcd216c66897cb9a4da7c.svg", "e41e62106d6bcd216c66897cb9a4da7c"],
    ["/static/build/e461fa532c376fb08c2f2d2a42afa6f6.svg", "e461fa532c376fb08c2f2d2a42afa6f6"],
    ["/static/build/e48836f03f51306a57ce41e5f8ba6b0f.png", "e48836f03f51306a57ce41e5f8ba6b0f"],
    ["/static/build/ebb0e2276258bb09d2e6dfa186ae5ec9.svg", "ebb0e2276258bb09d2e6dfa186ae5ec9"],
    ["/static/build/ef9739d193a2cdf7df2f5156d3c034a3.svg", "ef9739d193a2cdf7df2f5156d3c034a3"],
    ["/static/build/f3d842f42f1bacb86ccec04c7f34c491.png", "f3d842f42f1bacb86ccec04c7f34c491"],
    ["/static/build/f5b5885ce0aa7b771eb57dedcdf8492d.svg", "f5b5885ce0aa7b771eb57dedcdf8492d"],
    ["/static/build/f89763501918143b3013e656b5e8a4e4.png", "f89763501918143b3013e656b5e8a4e4"],
    ["/static/build/fa00696f094c0443ee69564ceb7a47bd.jpeg", "fa00696f094c0443ee69564ceb7a47bd"],
    ["/static/build/fa3c97db4634b94723fa334c38759590.svg", "fa3c97db4634b94723fa334c38759590"],
    ["/static/build/fed97f690375bd79a262dd4abbdc0014.jpeg", "fed97f690375bd79a262dd4abbdc0014"],
    ["/static/build/fonts/1ed0e402ccc0045ba37efca7e0179cc1.ttf", "1ed0e402ccc0045ba37efca7e0179cc1"],
    ["/static/build/fonts/582965b1c04af7ef1b413cfedc4f5dc0.woff2", "582965b1c04af7ef1b413cfedc4f5dc0"],
    ["/static/build/fonts/6787f7494d8f9ffd9f01bef6b308aed6.ttf", "6787f7494d8f9ffd9f01bef6b308aed6"],
    ["/static/build/fonts/6e31b77dd8734acf7d97a3e2e25eaf89.woff", "6e31b77dd8734acf7d97a3e2e25eaf89"],
    ["/static/build/fonts/745c3f0d24a4048ae93fe58f35037c11.woff", "745c3f0d24a4048ae93fe58f35037c11"],
    ["/static/build/fonts/82882c70eb48173b7fa33a788d22b897.woff2", "82882c70eb48173b7fa33a788d22b897"],
    ["/static/build/fonts/c10c11f5533fe73f6c724eccadbda395.woff2", "c10c11f5533fe73f6c724eccadbda395"],
    ["/static/build/fonts/d0e3dc49161ad772087b60b25504df3b.ttf", "d0e3dc49161ad772087b60b25504df3b"],
    ["/static/build/fonts/d5a1aceccfc55e7186da768cd6a6b400.ttf", "d5a1aceccfc55e7186da768cd6a6b400"],
    ["/static/build/fonts/eaae59cc5f01574107bec9ae7fe72a09.woff", "eaae59cc5f01574107bec9ae7fe72a09"],
    ["/static/build/fonts/f2310425330e0b6f10853036cd02e1f1.woff", "f2310425330e0b6f10853036cd02e1f1"],
    ["/static/build/fonts/ffada8a9222bd9c4e11ab06b73589ad1.woff2", "ffada8a9222bd9c4e11ab06b73589ad1"],
    ["/static/build/main-4b877e090f15bb003b13.js", "71919badefbc0fc4d3ef654158917167"],
    ["/static/build/manifest-2b50404b26d24da67db2.js", "ddbbe0a7c8afa1ffd5e3a6bb508a09c0"],
    ["/static/build/style.4e04bf4cdb22ce23a3190a1ef39e0798.css", "780b89422d9c525fa00d029ec09ea00c"],
    ["/static/build/style.bf79666c6be28587966c28ccd19240fe.css", "8c26a93dc00fa5a96d3c4b1279b322a1"],
    ["/static/build/vendor-11fdf64f8c6065be1a87.js", "7537526af22537f5a8ef7703fb216d8f"],
    ["/vendor/leanplum.js", "a6356a6467b63bbde50b9758fe2e9536"]
];
var cacheName = 'sw-precache-v3-TinderWeb-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/, /^v$/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function(body) {
        // new Response() is happy when passed either a stream or a Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function(originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
        return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
        .split('&') // Split into an array of 'key=value' strings
        .map(function(kv) {
            return kv.split('='); // Split each 'key=value' string into a [key, value] array
        })
        .filter(function(kv) {
            return ignoreUrlParametersMatching.every(function(ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
            });
        })
        .map(function(kv) {
            return kv.join('='); // Join each [key, value] array into a 'key=value' string
        })
        .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
};


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function(item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function(requests) {
        return requests.map(function(request) {
            return request.url;
        });
    }).then(function(urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return setOfCachedUrls(cache).then(function(cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
                        // If we don't have a key matching url in the cache already, add it.
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function(response) {
                                // Bail out of installation unless we get back a 200 OK for
                                // every request.
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function(responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        }).then(function() {

            // Force the SW to transition from installing -> active state
            return self.skipWaiting();

        })
    );
});

self.addEventListener('activate', function(event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.keys().then(function(existingRequests) {
                return Promise.all(
                    existingRequests.map(function(existingRequest) {
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function() {

            return self.clients.claim();

        })
    );
});


self.addEventListener('fetch', function(event) {
    if (event.request.method === 'GET') {
        // Should we call event.respondWith() inside this fetch event handler?
        // This needs to be determined synchronously, which will give other fetch
        // handlers a chance to handle the request if need be.
        var shouldRespond;

        // First, remove all the ignored parameters and hash fragment, and see if we
        // have that URL in our cache. If so, great! shouldRespond will be true.
        var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
        shouldRespond = urlsToCacheKeys.has(url);

        // If shouldRespond is false, check again, this time with 'index.html'
        // (or whatever the directoryIndex option is set to) at the end.
        var directoryIndex = '';
        if (!shouldRespond && directoryIndex) {
            url = addDirectoryIndex(url, directoryIndex);
            shouldRespond = urlsToCacheKeys.has(url);
        }

        // If shouldRespond is still false, check to see if this is a navigation
        // request, and if so, whether the URL matches navigateFallbackWhitelist.
        var navigateFallback = '/static/build/index.html';
        if (!shouldRespond &&
            navigateFallback &&
            (event.request.mode === 'navigate') &&
            isPathWhitelisted([], event.request.url)) {
            url = new URL(navigateFallback, self.location).toString();
            shouldRespond = urlsToCacheKeys.has(url);
        }

        // If shouldRespond was set to true at any point, then call
        // event.respondWith(), using the appropriate cache key.
        if (shouldRespond) {
            event.respondWith(
                caches.open(cacheName).then(function(cache) {
                    return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
                        if (response) {
                            return response;
                        }
                        throw Error('The cached response that was expected is missing.');
                    });
                }).catch(function(e) {
                    // Fall back to just fetch()ing the request if some unexpected error
                    // prevented the cached response from being valid.
                    console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                    return fetch(event.request);
                })
            );
        }
    }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
! function(e) { if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else { var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.toolbox = e() } }(function() { return function e(t, n, r) {
        function o(c, s) { if (!n[c]) { if (!t[c]) { var a = "function" == typeof require && require; if (!s && a) return a(c, !0); if (i) return i(c, !0); var u = new Error("Cannot find module '" + c + "'"); throw u.code = "MODULE_NOT_FOUND", u } var f = n[c] = { exports: {} };
                t[c][0].call(f.exports, function(e) { var n = t[c][1][e]; return o(n ? n : e) }, f, f.exports, e, t, n, r) } return n[c].exports } for (var i = "function" == typeof require && require, c = 0; c < r.length; c++) o(r[c]); return o }({ 1: [function(e, t, n) { "use strict";

            function r(e, t) { t = t || {}; var n = t.debug || m.debug;
                n && console.log("[sw-toolbox] " + e) }

            function o(e) { var t; return e && e.cache && (t = e.cache.name), t = t || m.cache.name, caches.open(t) }

            function i(e, t) { t = t || {}; var n = t.successResponses || m.successResponses; return fetch(e.clone()).then(function(r) { return "GET" === e.method && n.test(r.status) && o(t).then(function(n) { n.put(e, r).then(function() { var r = t.cache || m.cache;
                            (r.maxEntries || r.maxAgeSeconds) && r.name && c(e, n, r) }) }), r.clone() }) }

            function c(e, t, n) { var r = s.bind(null, e, t, n);
                d = d ? d.then(r) : r() }

            function s(e, t, n) { var o = e.url,
                    i = n.maxAgeSeconds,
                    c = n.maxEntries,
                    s = n.name,
                    a = Date.now(); return r("Updating LRU order for " + o + ". Max entries is " + c + ", max age is " + i), g.getDb(s).then(function(e) { return g.setTimestampForUrl(e, o, a) }).then(function(e) { return g.expireEntries(e, c, i, a) }).then(function(e) { r("Successfully updated IDB."); var n = e.map(function(e) { return t.delete(e) }); return Promise.all(n).then(function() { r("Done with cache cleanup.") }) }).catch(function(e) { r(e) }) }

            function a(e, t, n) { return r("Renaming cache: [" + e + "] to [" + t + "]", n), caches.delete(t).then(function() { return Promise.all([caches.open(e), caches.open(t)]).then(function(t) { var n = t[0],
                            r = t[1]; return n.keys().then(function(e) { return Promise.all(e.map(function(e) { return n.match(e).then(function(t) { return r.put(e, t) }) })) }).then(function() { return caches.delete(e) }) }) }) }

            function u(e, t) { return o(t).then(function(t) { return t.add(e) }) }

            function f(e, t) { return o(t).then(function(t) { return t.delete(e) }) }

            function h(e) { e instanceof Promise || p(e), m.preCacheItems = m.preCacheItems.concat(e) }

            function p(e) { var t = Array.isArray(e); if (t && e.forEach(function(e) { "string" == typeof e || e instanceof Request || (t = !1) }), !t) throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests."); return e }

            function l(e, t, n) { if (!e) return !1; if (t) { var r = e.headers.get("date"); if (r) { var o = new Date(r); if (o.getTime() + 1e3 * t < n) return !1 } } return !0 } var d, m = e("./options"),
                g = e("./idb-cache-expiration");
            t.exports = { debug: r, fetchAndCache: i, openCache: o, renameCache: a, cache: u, uncache: f, precache: h, validatePrecacheInput: p, isResponseFresh: l } }, { "./idb-cache-expiration": 2, "./options": 4 }], 2: [function(e, t, n) { "use strict";

            function r(e) { return new Promise(function(t, n) { var r = indexedDB.open(u + e, f);
                    r.onupgradeneeded = function() { var e = r.result.createObjectStore(h, { keyPath: p });
                        e.createIndex(l, l, { unique: !1 }) }, r.onsuccess = function() { t(r.result) }, r.onerror = function() { n(r.error) } }) }

            function o(e) { return e in d || (d[e] = r(e)), d[e] }

            function i(e, t, n) { return new Promise(function(r, o) { var i = e.transaction(h, "readwrite"),
                        c = i.objectStore(h);
                    c.put({ url: t, timestamp: n }), i.oncomplete = function() { r(e) }, i.onabort = function() { o(i.error) } }) }

            function c(e, t, n) { return t ? new Promise(function(r, o) { var i = 1e3 * t,
                        c = [],
                        s = e.transaction(h, "readwrite"),
                        a = s.objectStore(h),
                        u = a.index(l);
                    u.openCursor().onsuccess = function(e) { var t = e.target.result; if (t && n - i > t.value[l]) { var r = t.value[p];
                            c.push(r), a.delete(r), t.continue() } }, s.oncomplete = function() { r(c) }, s.onabort = o }) : Promise.resolve([]) }

            function s(e, t) { return t ? new Promise(function(n, r) { var o = [],
                        i = e.transaction(h, "readwrite"),
                        c = i.objectStore(h),
                        s = c.index(l),
                        a = s.count();
                    s.count().onsuccess = function() { var e = a.result;
                        e > t && (s.openCursor().onsuccess = function(n) { var r = n.target.result; if (r) { var i = r.value[p];
                                o.push(i), c.delete(i), e - o.length > t && r.continue() } }) }, i.oncomplete = function() { n(o) }, i.onabort = r }) : Promise.resolve([]) }

            function a(e, t, n, r) { return c(e, n, r).then(function(n) { return s(e, t).then(function(e) { return n.concat(e) }) }) } var u = "sw-toolbox-",
                f = 1,
                h = "store",
                p = "url",
                l = "timestamp",
                d = {};
            t.exports = { getDb: o, setTimestampForUrl: i, expireEntries: a } }, {}], 3: [function(e, t, n) { "use strict";

            function r(e) { var t = a.match(e.request);
                t ? e.respondWith(t(e.request)) : a.default && "GET" === e.request.method && 0 === e.request.url.indexOf("http") && e.respondWith(a.default(e.request)) }

            function o(e) { s.debug("activate event fired"); var t = u.cache.name + "$$$inactive$$$";
                e.waitUntil(s.renameCache(t, u.cache.name)) }

            function i(e) { return e.reduce(function(e, t) { return e.concat(t) }, []) }

            function c(e) { var t = u.cache.name + "$$$inactive$$$";
                s.debug("install event fired"), s.debug("creating cache [" + t + "]"), e.waitUntil(s.openCache({ cache: { name: t } }).then(function(e) { return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t) { return s.debug("preCache list: " + (t.join(", ") || "(none)")), e.addAll(t) }) })) }
            e("serviceworker-cache-polyfill"); var s = e("./helpers"),
                a = e("./router"),
                u = e("./options");
            t.exports = { fetchListener: r, activateListener: o, installListener: c } }, { "./helpers": 1, "./options": 4, "./router": 6, "serviceworker-cache-polyfill": 16 }], 4: [function(e, t, n) { "use strict"; var r;
            r = self.registration ? self.registration.scope : self.scope || new URL("./", self.location).href, t.exports = { cache: { name: "$$$toolbox-cache$$$" + r + "$$$", maxAgeSeconds: null, maxEntries: null }, debug: !1, networkTimeoutSeconds: null, preCacheItems: [], successResponses: /^0|([123]\d\d)|(40[14567])|410$/ } }, {}], 5: [function(e, t, n) { "use strict"; var r = new URL("./", self.location),
                o = r.pathname,
                i = e("path-to-regexp"),
                c = function(e, t, n, r) { t instanceof RegExp ? this.fullUrlRegExp = t : (0 !== t.indexOf("/") && (t = o + t), this.keys = [], this.regexp = i(t, this.keys)), this.method = e, this.options = r, this.handler = n };
            c.prototype.makeHandler = function(e) { var t; if (this.regexp) { var n = this.regexp.exec(e);
                    t = {}, this.keys.forEach(function(e, r) { t[e.name] = n[r + 1] }) } return function(e) { return this.handler(e, t, this.options) }.bind(this) }, t.exports = c }, { "path-to-regexp": 15 }], 6: [function(e, t, n) { "use strict";

            function r(e) { return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") } var o = e("./route"),
                i = e("./helpers"),
                c = function(e, t) { for (var n = e.entries(), r = n.next(), o = []; !r.done;) { var i = new RegExp(r.value[0]);
                        i.test(t) && o.push(r.value[1]), r = n.next() } return o },
                s = function() { this.routes = new Map, this.routes.set(RegExp, new Map), this.default = null };
            ["get", "post", "put", "delete", "head", "any"].forEach(function(e) { s.prototype[e] = function(t, n, r) { return this.add(e, t, n, r) } }), s.prototype.add = function(e, t, n, c) { c = c || {}; var s;
                t instanceof RegExp ? s = RegExp : (s = c.origin || self.location.origin, s = s instanceof RegExp ? s.source : r(s)), e = e.toLowerCase(); var a = new o(e, t, n, c);
                this.routes.has(s) || this.routes.set(s, new Map); var u = this.routes.get(s);
                u.has(e) || u.set(e, new Map); var f = u.get(e),
                    h = a.regexp || a.fullUrlRegExp;
                f.has(h.source) && i.debug('"' + t + '" resolves to same regex as existing route.'), f.set(h.source, a) }, s.prototype.matchMethod = function(e, t) { var n = new URL(t),
                    r = n.origin,
                    o = n.pathname; return this._match(e, c(this.routes, r), o) || this._match(e, [this.routes.get(RegExp)], t) }, s.prototype._match = function(e, t, n) { if (0 === t.length) return null; for (var r = 0; r < t.length; r++) { var o = t[r],
                        i = o && o.get(e.toLowerCase()); if (i) { var s = c(i, n); if (s.length > 0) return s[0].makeHandler(n) } } return null }, s.prototype.match = function(e) { return this.matchMethod(e.method, e.url) || this.matchMethod("any", e.url) }, t.exports = new s }, { "./helpers": 1, "./route": 5 }], 7: [function(e, t, n) { "use strict";

            function r(e, t, n) { return n = n || {}, i.debug("Strategy: cache first [" + e.url + "]", n), i.openCache(n).then(function(t) { return t.match(e).then(function(t) { var r = n.cache || o.cache,
                            c = Date.now(); return i.isResponseFresh(t, r.maxAgeSeconds, c) ? t : i.fetchAndCache(e, n) }) }) } var o = e("../options"),
                i = e("../helpers");
            t.exports = r }, { "../helpers": 1, "../options": 4 }], 8: [function(e, t, n) { "use strict";

            function r(e, t, n) { return n = n || {}, i.debug("Strategy: cache only [" + e.url + "]", n), i.openCache(n).then(function(t) { return t.match(e).then(function(e) { var t = n.cache || o.cache,
                            r = Date.now(); if (i.isResponseFresh(e, t.maxAgeSeconds, r)) return e }) }) } var o = e("../options"),
                i = e("../helpers");
            t.exports = r }, { "../helpers": 1, "../options": 4 }], 9: [function(e, t, n) { "use strict";

            function r(e, t, n) { return o.debug("Strategy: fastest [" + e.url + "]", n), new Promise(function(r, c) { var s = !1,
                        a = [],
                        u = function(e) { a.push(e.toString()), s ? c(new Error('Both cache and network failed: "' + a.join('", "') + '"')) : s = !0 },
                        f = function(e) { e instanceof Response ? r(e) : u("No result returned") };
                    o.fetchAndCache(e.clone(), n).then(f, u), i(e, t, n).then(f, u) }) } var o = e("../helpers"),
                i = e("./cacheOnly");
            t.exports = r }, { "../helpers": 1, "./cacheOnly": 8 }], 10: [function(e, t, n) { t.exports = { networkOnly: e("./networkOnly"), networkFirst: e("./networkFirst"), cacheOnly: e("./cacheOnly"), cacheFirst: e("./cacheFirst"), fastest: e("./fastest") } }, { "./cacheFirst": 7, "./cacheOnly": 8, "./fastest": 9, "./networkFirst": 11, "./networkOnly": 12 }], 11: [function(e, t, n) { "use strict";

            function r(e, t, n) { n = n || {}; var r = n.successResponses || o.successResponses,
                    c = n.networkTimeoutSeconds || o.networkTimeoutSeconds; return i.debug("Strategy: network first [" + e.url + "]", n), i.openCache(n).then(function(t) { var s, a, u = []; if (c) { var f = new Promise(function(r) { s = setTimeout(function() { t.match(e).then(function(e) { var t = n.cache || o.cache,
                                        c = Date.now(),
                                        s = t.maxAgeSeconds;
                                    i.isResponseFresh(e, s, c) && r(e) }) }, 1e3 * c) });
                        u.push(f) } var h = i.fetchAndCache(e, n).then(function(e) { if (s && clearTimeout(s), r.test(e.status)) return e; throw i.debug("Response was an HTTP error: " + e.statusText, n), a = e, new Error("Bad response") }).catch(function(r) { return i.debug("Network or response error, fallback to cache [" + e.url + "]", n), t.match(e).then(function(e) { if (e) return e; if (a) return a; throw r }) }); return u.push(h), Promise.race(u) }) } var o = e("../options"),
                i = e("../helpers");
            t.exports = r }, { "../helpers": 1, "../options": 4 }], 12: [function(e, t, n) { "use strict";

            function r(e, t, n) { return o.debug("Strategy: network only [" + e.url + "]", n), fetch(e) } var o = e("../helpers");
            t.exports = r }, { "../helpers": 1 }], 13: [function(e, t, n) { "use strict"; var r = e("./options"),
                o = e("./router"),
                i = e("./helpers"),
                c = e("./strategies"),
                s = e("./listeners");
            i.debug("Service Worker Toolbox is loading"), self.addEventListener("install", s.installListener), self.addEventListener("activate", s.activateListener), self.addEventListener("fetch", s.fetchListener), t.exports = { networkOnly: c.networkOnly, networkFirst: c.networkFirst, cacheOnly: c.cacheOnly, cacheFirst: c.cacheFirst, fastest: c.fastest, router: o, options: r, cache: i.cache, uncache: i.uncache, precache: i.precache } }, { "./helpers": 1, "./listeners": 3, "./options": 4, "./router": 6, "./strategies": 10 }], 14: [function(e, t, n) { t.exports = Array.isArray || function(e) { return "[object Array]" == Object.prototype.toString.call(e) } }, {}], 15: [function(e, t, n) {
            function r(e, t) { for (var n, r = [], o = 0, i = 0, c = "", s = t && t.delimiter || "/"; null != (n = x.exec(e));) { var f = n[0],
                        h = n[1],
                        p = n.index; if (c += e.slice(i, p), i = p + f.length, h) c += h[1];
                    else { var l = e[i],
                            d = n[2],
                            m = n[3],
                            g = n[4],
                            v = n[5],
                            w = n[6],
                            y = n[7];
                        c && (r.push(c), c = ""); var b = null != d && null != l && l !== d,
                            E = "+" === w || "*" === w,
                            R = "?" === w || "*" === w,
                            k = n[2] || s,
                            $ = g || v;
                        r.push({ name: m || o++, prefix: d || "", delimiter: k, optional: R, repeat: E, partial: b, asterisk: !!y, pattern: $ ? u($) : y ? ".*" : "[^" + a(k) + "]+?" }) } } return i < e.length && (c += e.substr(i)), c && r.push(c), r }

            function o(e, t) { return s(r(e, t)) }

            function i(e) { return encodeURI(e).replace(/[\/?#]/g, function(e) { return "%" + e.charCodeAt(0).toString(16).toUpperCase() }) }

            function c(e) { return encodeURI(e).replace(/[?#]/g, function(e) { return "%" + e.charCodeAt(0).toString(16).toUpperCase() }) }

            function s(e) { for (var t = new Array(e.length), n = 0; n < e.length; n++) "object" == typeof e[n] && (t[n] = new RegExp("^(?:" + e[n].pattern + ")$")); return function(n, r) { for (var o = "", s = n || {}, a = r || {}, u = a.pretty ? i : encodeURIComponent, f = 0; f < e.length; f++) { var h = e[f]; if ("string" != typeof h) { var p, l = s[h.name]; if (null == l) { if (h.optional) { h.partial && (o += h.prefix); continue } throw new TypeError('Expected "' + h.name + '" to be defined') } if (v(l)) { if (!h.repeat) throw new TypeError('Expected "' + h.name + '" to not repeat, but received `' + JSON.stringify(l) + "`"); if (0 === l.length) { if (h.optional) continue; throw new TypeError('Expected "' + h.name + '" to not be empty') } for (var d = 0; d < l.length; d++) { if (p = u(l[d]), !t[f].test(p)) throw new TypeError('Expected all "' + h.name + '" to match "' + h.pattern + '", but received `' + JSON.stringify(p) + "`");
                                    o += (0 === d ? h.prefix : h.delimiter) + p } } else { if (p = h.asterisk ? c(l) : u(l), !t[f].test(p)) throw new TypeError('Expected "' + h.name + '" to match "' + h.pattern + '", but received "' + p + '"');
                                o += h.prefix + p } } else o += h } return o } }

            function a(e) { return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1") }

            function u(e) { return e.replace(/([=!:$\/()])/g, "\\$1") }

            function f(e, t) { return e.keys = t, e }

            function h(e) { return e.sensitive ? "" : "i" }

            function p(e, t) { var n = e.source.match(/\((?!\?)/g); if (n)
                    for (var r = 0; r < n.length; r++) t.push({ name: r, prefix: null, delimiter: null, optional: !1, repeat: !1, partial: !1, asterisk: !1, pattern: null }); return f(e, t) }

            function l(e, t, n) { for (var r = [], o = 0; o < e.length; o++) r.push(g(e[o], t, n).source); var i = new RegExp("(?:" + r.join("|") + ")", h(n)); return f(i, t) }

            function d(e, t, n) { return m(r(e, n), t, n) }

            function m(e, t, n) { v(t) || (n = t || n, t = []), n = n || {}; for (var r = n.strict, o = n.end !== !1, i = "", c = 0; c < e.length; c++) { var s = e[c]; if ("string" == typeof s) i += a(s);
                    else { var u = a(s.prefix),
                            p = "(?:" + s.pattern + ")";
                        t.push(s), s.repeat && (p += "(?:" + u + p + ")*"), p = s.optional ? s.partial ? u + "(" + p + ")?" : "(?:" + u + "(" + p + "))?" : u + "(" + p + ")", i += p } } var l = a(n.delimiter || "/"),
                    d = i.slice(-l.length) === l; return r || (i = (d ? i.slice(0, -l.length) : i) + "(?:" + l + "(?=$))?"), i += o ? "$" : r && d ? "" : "(?=" + l + "|$)", f(new RegExp("^" + i, h(n)), t) }

            function g(e, t, n) { return v(t) || (n = t || n, t = []), n = n || {}, e instanceof RegExp ? p(e, t) : v(e) ? l(e, t, n) : d(e, t, n) } var v = e("isarray");
            t.exports = g, t.exports.parse = r, t.exports.compile = o, t.exports.tokensToFunction = s, t.exports.tokensToRegExp = m; var x = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"), "g") }, { isarray: 14 }], 16: [function(e, t, n) {! function() { var e = Cache.prototype.addAll,
                    t = navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/); if (t) var n = t[1],
                    r = parseInt(t[2]);
                e && (!t || "Firefox" === n && r >= 46 || "Chrome" === n && r >= 50) || (Cache.prototype.addAll = function(e) {
                    function t(e) { this.name = "NetworkError", this.code = 19, this.message = e } var n = this; return t.prototype = Object.create(Error.prototype), Promise.resolve().then(function() { if (arguments.length < 1) throw new TypeError; return e = e.map(function(e) { return e instanceof Request ? e : String(e) }), Promise.all(e.map(function(e) { "string" == typeof e && (e = new Request(e)); var n = new URL(e.url).protocol; if ("http:" !== n && "https:" !== n) throw new t("Invalid scheme"); return fetch(e.clone()) })) }).then(function(r) { if (r.some(function(e) { return !e.ok })) throw new t("Incorrect response status"); return Promise.all(r.map(function(t, r) { return n.put(e[r], t) })) }).then(function() {}) }, Cache.prototype.add = function(e) { return this.addAll([e]) }) }() }, {}] }, {}, [13])(13) });


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get(/\/locale-data\//, toolbox.cacheFirst, { "cache": { "name": "locale-data", "maxEntries": 11 } });
toolbox.router.get(/\/build\/chunks\//, toolbox.cacheFirst, {});
toolbox.router.get(/^https:\/\/connect\.facebook\.net\//, toolbox.fastest, {});




importScripts("/static/handlePushNotifications.js");