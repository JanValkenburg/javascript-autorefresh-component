# Javascript auto refresh component
Javascript Auto Refresh Component is a simple class that loads and refresh 
element on a page. Beside of loading and refreshing the element it only 
reload the elements when the page is visible in the browser. This element will
not be refreshed when the page is inactive of when you are hovering above the
container of the element. 

## How to use
This class can be used as shown below. Just include the attributes load-component 
and refresh-interval to the container and simple include the 
auto-refresh-component script and start it as shown in the example below.
```html
…
<section
        load-component="page2.html"
        refresh-interval="15">
</section>
…
<script src="../src/auto-refresh-component.js"></script>
<script>
        (new autoRefreshComponent()).run();
</script>
```