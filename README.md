# Project Spec
You will be creating a simple Shopify app that will fetch images of cats and display them on multiple pages (called templates) in a Shopify store.

The project consists of 2 parts:

1. Javascript + HTML: Create a JS script to fetch images from a JSON API and write them as HTML image tags on to the current page.
2. Add the JS + HTML code you make in step 1 to the Shopify theme via the Shopify theme-app-extensions API in the app.

After completion, the Shopify app will modify the theme to dynamically show cat images.

## Getting started

Shopify already has an excellent demo app which does all the basics we need. You can simply download this sample code first, then directly work on the theme change code. To get started:

* Follow these instructions to create a free partner account and download the sample app using the Shopify CLI for Node JS dev - https://shopify.dev/apps/getting-started/create
* Create a development / test store on your Shopify partner account and install the sample app to it. You should see the UI showing inside the app dashboard. 

This project has 3 milestones

1. Create the appropriate theme extensions (2 app blocks + 1 app embedded block)
2. Create new functions in the node.js app to manage theme extensions
3. Write mocha tests to unit test your new functions in #2

## 1. Creating the theme extensions

Use [this guide](https://shopify.dev/apps/online-store/theme-app-extensions/getting-started) to add a theme app extension to the app above

Here is an example directory containing examples of app blocks and app embedded blocks: https://github.com/Shopify/theme-extension-getting-started

1. Create two app blocks with [this guide](https://shopify.dev/apps/online-store/theme-app-extensions/extensions-framework#app-blocks). 

- One cat - an html block to store one cat image
- Many cats - an html block to store many cat images 

You can use this code to define both blocks:

Liquid code for One cat

```liquid
{% render "app_snippet" %}
{% schema %}
  {
    "name": "One Cat",
    "target": "section",
	"templates": ["index"],
	"class": "testapp-onecat"
  }
{% endschema %}
```
Liquid code for Many cats

```liquid
{% render "app_snippet" %}
{% schema %}
  {
    "name": "Many Cats",
    "target": "section",
	"templates": ["404", "cart","collection","list-collections","index","product","search"],
	"class": "testapp-manycats"
  }
{% endschema %}
```
The above code will create an empty HTML block with a div of class `testapp-manycats`. and it will allow adding this HTML block in the theme editor in 7 page types under 'templates'.

2. Create an embedded app block - it should contain a basic javascript file which is a script include. 

```liquid
{% schema %}
  {
    "name": "CatImages",
    "target": "head",
	"javascript": "cats.js",
	"stylesheet": "cats.css",
    "templates": ["404", "cart","collection","list-collections","index","product","search"],
  }
{% endschema %}
```
cats.js

Functionality:
- Use `window.fetch` to call `https://api.thecatapi.com/v1/images/search?limit=10` which will get 10 images of cats in an array.
- Insert the first image in the array as an `img` tag inside the `onecat` app block.
- Insert the remaining 9 images as 9 `img` tags inside the `manycats` app block.

Tip: You can use `const appBlockRootElem = document.getElementsByClassName("onecat")[0];` to get the root element of the `onecat` app block.

## 2. Managing app blocks in the app

First, create a function that gets called in the shop installation process. 

```typescript
//function signature
function installThemeToShop(shopifyDomain:string):[string,[]string] {
}
```
You have two return values, a string and a string array:


- First return value: Install the app embedded block to the store and create a deep link to allow the user to activate the embedded block on their store. Return this deep link as a string (should always be a valid URL)

- Call theme API and determine if the current theme supports app blocks or not. Use this code sample to do the verification: https://shopify.dev/apps/online-store/verify-support#verify-support-for-app-blocks

The Many cats block can be installed in 7 different templates: ["404", "cart","collection","list-collections","index","product","search"]

Your goal is to check how many of these templates are supported by the current theme and install the app blocks just in those templates.
	- If theme supports the app blocks in all the template types required:
		Install the app blocks on the theme and return an empty string array i.e. `[]`

	- If theme supports the app blocks in only some templates:
		Install the app blocks on only the supported template types and return a string array of all the templates the theme does NOT support. e.g. if the theme does not support "cart" and "collection", you will return ["cart","collection"]
	- If the theme does not support any app blocks:
		return the entire array ["404", "cart","collection","list-collections","index","product","search"]

- Create a another function route in the express app which takes one parameter called shop

```typescript
//function signature
function getAppBlockInstallationStatus(shopifyDomain:string):{"app_embedded_block":boolean, "onecat":boolean,"manycats":boolean} {
}
```
Use this codesample to understand how many app blocks were installed by the shop user: https://shopify.dev/apps/online-store/theme-app-extensions/extensions-framework#detecting-app-blocks-and-app-embed-blocks

Your return type should look this:
JSON:
{"app_embedded_block":true/false,
"onecat":true/false,
"manycats":true/false,
}
where the value of true/false depends on if the shop has enabled the appropriate app blocks on the theme.

Create a new route in the express app like this `/themestatus?shop=myteststore.myshopify.com`. Pass the shop query param to your function and return the JSON you generate to the caller.

## 3. Create Mocha unit tests for both functions

You can use `sinon` to mock the Shopify API's. You don't need to be exhaustive but test the happy path and a few other paths to make sure your code is working.
