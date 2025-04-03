# Tekko Website

## Setting up your dev environment

As usual, you'll want to clone this repo with
`git clone https://pittjcs@bitbucket.org/pittjcs/tekko.git`
and then run
`npm install`

This project is based on the boilerplate project developed by the folks at [Storyblok](http://storyblok.com).
To access the content, you must be added as a collaborator on https://app.storyblok.com.

Once you've logged in, you can preview your local project as you work on it.  Click on "Content" on the left, and then click any page listed on the right.

![Storyblok content page](https://lh3.googleusercontent.com/lic-v7HJ7Pr8l5Ugr4qLbL-7fxz9Ut1NB15NSxnMtrAzdjf0szd8cr2AcUDEGxH7-cRMs4JTAeppjFlCNI5DrCtN9B4QUjTL_PTgBOzRLmNsE0GimptvXAbYvsTNnXAU0W8nQHEDimACexlCitgR37nBll6mfqFdF-zcdxrqV4dE2KSjHfjLwieL3TZSnPTmvpWDFQgZ2oNyJaHHRJrjHYzFM5--oQe-RBHVmTMey-R78yF13HYaELpaNDrxgxZ5AdcpZxsOKkjm_9YOw_LdWeigrvqvYw0ueepyoumYxhsDY3sa75ZSE2FpO1qiJJAEVVmmp8-ZzLNsAOpmr2nFGPHTlf6SSSkTRe3Eg85D1TBlVlTCVdKhRNeKyorDi7iITZnW1USU5g6woCjT_BBbGff-Lz1UqoJaxq0PE7omTXrsaEE5V0HUXJhrfCx-x0qkt9MYuMJGMxdV3UIZ8Ienx8pGaAyrWgKsMKSNd9OGrVqCuKCRid3_GdvLmw00b6LEiW2att10N5-w8YjIeIEnvCvQuabg7h29eonLlgsladZXxJZwKrylw3uYNsRS0UefQkxj766J3MjO0Zi2GVKgDTyrhzmQ0iM7HYZzaZPVRpLkh7nbMcqz0FXLVaKnnFCllP0xv3c-r6zuf3-9UAuaSaxXREqtbg=w800-h406-no)

Now add your local URL to the text box under "2. Start your server"(most likely http://localhost:3000)

## Adding components

You can create new components by clicking on "Components" on the left, and then clicking on the "New" button in the top right.  Using Storyblok, you can define a schema and it will generate a user-friendly form to fill in the data.

[Read more about the Storyblok editor.](https://www.storyblok.com/docs/the-editor)

In your project, create a vue component to correspond with the new schema.  Remember that Vue requires exactly one root element, just add the `v-editable="blok"` directive to that to make sure your component wires up to Storyblok correctly.  `blok` is always your main component object, and each of its properties map to one of the fields in your custom schema.  Remember to always export a default object like so.
```html
<template>
  <div v-editable="blok">
    <h2>{{ blok.title }}</h2>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>
```

To make your new component available to use in your project, open your `plugins/components.js` file and add the following.
```javascript
import ComponentName from 'components/ComponentName.vue'

Vue.component('blok-component--name', ComponentName)
```
Where ComponentName is the filename of your component, and 'blok-component--name' is the name you added to Storyblok's editor, prefixed by 'blok-'.  Keep in mind that the api converts the name as it appears on Storyblok to a json-friendly format for your code. Uppercase is converted to lowercase, and spaces are replaced by two hypens.  (e.g. 'Component Name' becomes 'blok-component--name')

[Read more about integrating Storyblok with Nuxt.js.](https://www.storyblok.com/tp/headless-cms-nuxtjs)

[Read more about the Storyblok content delivery API.](https://www.storyblok.com/docs/api/content-delivery)