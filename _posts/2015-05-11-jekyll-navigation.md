---

layout: post
title: Jekyll Navigation
excerpt: An exploration of an approach to Jekyll site navigation, with an additional approach for multi-lingual sites.
description: Exploring Jekyll site navigation options
code: true
tags: post
resources:
- text: Jekyll Documentation - Data Files
  url: http://jekyllrb.com/docs/datafiles/
- text: Liquid for Designers
  url: https://github.com/Shopify/liquid/wiki/Liquid-for-Designers
permalink: "{{ site.blogroll }}/{{ page.fileSlug }}.html"
---


In this post, I&rsquo;ll introduce a technique for creating navigation for a Jekyll-powered website. After working through the basic example, I&rsquo;ll show how I&rsquo;ve extended it for use in a multi-lingual site.

In these examples, I&rsquo;ll use data files to hold the list of navigation items, then a [Liquid `for` loop](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers#for-loops) to build the navigation list. [Jekyll data files](http://jekyllrb.com/docs/datafiles/) hold additional data for Jekyll to load while generating your site. They&rsquo;re a great place to store strings, common URLs, and more.

## The Basic Nav

First, create a list of items in <code class="path">_data/nav.yaml</code>, each with &lsquo;text&rsquo; and &lsquo;url&rsquo; properties to hold the necessary information.

<figure>
{% highlight yml %}
- text: Home
  url: /
- text: About
  url: /about/
- text: Blog
  url: /blog/
{% endhighlight %}
  <figcaption>From _data/nav.yaml</figcaption>
</figure>

Now that the data file is ready, assign the current page&rsquo;s URL to a variable. &ldquo;Current page&rdquo; in this context refers to the page being processed during Jekyll&rsquo;s build.

<figure>
{% highlight liquid %}
{% assign thisUrl = page.url | remove: 'index.html' %}
{% endhighlight %}
  <figcaption>Capture the page&rsquo;s URL</figcaption>
</figure>

So as Jekyll iterates through the pages in the site, each page&rsquo;s URL will be captured and used for building the rest of the navigation.

### One Small Problem

The home page doesn&rsquo;t need the &lsquo;home&rsquo; link, so the loop should skip over the first list item when Jekyll builds the home page. Liquid provides a handy `offset` property, available inside `for` loops, for which this is a perfect use-case.

To set the `offset`, test whether or not the current page is the home page. If it is, set the offset to 1, which will skip over the first list item (&lsquo;home&rsquo;). Otherwise, let the loop start at the first item, as it would by default.

<figure>
{% highlight liquid %}
{% if thisUrl == "/" %}
  {% assign navOffset = 1 %}
{% else %}
  {% assign navOffset = 0 %}
{% endif %}
{% endhighlight %}
  <figcaption>Use a loop offset to skip the home link on the homepage</figcaption>
</figure>

### The Loop

Now that all the pieces are in place, add the loop to build the navigation list.

Use a `for` loop to iterate over the items in `site.data.nav`, comparing each item to the current page&rsquo;s URL. If the item matches the page's URL, mark the navigation item as &ldquo;current&rdquo; for styling purposes.

<figure>
{% highlight html %}
<nav role="navigation">
  <ul>
  {% for item in site.data.nav offset:navOffset %}
    {% if item.url == thisUrl %}
      <li class="current">{{ item.text }}</li>
    {% else %}
      <li><a href="{{ item.url }}">{{ item.text }}</a></li>
    {% endif %}
  {% endfor %}
  </ul>
</nav>
{% endhighlight %}
  <figcaption>The loop</figcaption>
</figure>

## The Multi-Lingual Nav

I&rsquo;m in the process of building a website that needs to be translated into Spanish, including the navigation, which proved to be a bit tricky. Here&rsquo;s my approach to a multi-lingual navigation, which builds off of _The Basic Nav_ idea above.

### The Data Files

For this site, the data files also serve to hold translated strings. As such, there are two data files:

<figure>
{% highlight yml %}
nav:
- text: Home
  url: /
- text: Espa&ntilde;ol
  url: /es/
- text: About
  url: /about/
- text: Contact
  url: /contact/

home: /
other: /es/
{% endhighlight %}
  <figcaption>From _data/strings_en.yaml</figcaption>
</figure>

<figure>
{% highlight yml %}
nav:
- text: Inicio
  url: /es/
- text: English
  url: /
- text: Acerca
  url: /es/acerca/
- text: Contacto
  url: /es/contacto/

home: /es/
other: /
{% endhighlight %}
  <figcaption>From _data/strings_es.yaml</figcaption>
</figure>

`home` and `other` will be used to tell the loop which site is being built. More on that later...

As with _The Basic Nav_ example above, the current page&rsquo;s URL needs to be captured for use in the loop.

<figure>
{% highlight liquid %}
{% assign thisUrl = page.url | remove: 'index.html' %}
{% endhighlight %}
  <figcaption>Capture the page&rsquo;s URL</figcaption>
</figure>

Next, tell Jekyll which data file to use by checking the URL for the language-specific directory. If the URL contains the directory name &mdash; in this case '<code class="path">/es/</code>' &mdash; use the translated strings. Otherwise, use the english strings.

<figure>
{% highlight liquid %}
{% if thisUrl contains "/es/" %}
  {% assign strings = site.data.strings_es %}
{% else %}
  {% assign strings = site.data.strings_en %}
{% endif %}
{% endhighlight %}
  <figcaption>Tell Jekyll which data file to use</figcaption>
</figure>

For the offset, the only difference is checking for the translated home page URL in addition to the english home page URL.

<figure>
{% highlight liquid %}
{% if thisUrl == "/" or thisUrl == "/es/" %}
  {% assign navOffset = 1 %}
{% else %}
  {% assign navOffset = 0 %}
{% endif %}
{% endhighlight %}
  <figcaption>Set the offset using both home page URLs</figcaption>
</figure>

### The Problem, Part Deux

As with _The Basic Nav_ above, the home pages &mdash; both the translated site and the english site &mdash; shouldn&rsquo;t show a home link. We solve this by conditionally setting the `offset`. But on the home page, the link to the translated home page _should_ show.

So the loop essentially says, for items in this list, if the item is not the home page, skip the translated home link. Otherwise, build the list normally. And, of course, the list may or may not be offset, based on the page's URL.

<figure>
{% highlight html %}
<nav role="navigation">

  <ul>
  {% for item in strings.nav offset:navOffset %}
    {% if thisUrl != strings.home %}
      {% if item.url != strings.other %}
        {% if item.url == thisUrl %}<li class="current">{{ item.text }}{% else %}<li><a href="{{ item.url }}">{{ item.text }}</a>{% endif %}</li>
      {% endif %}
    {% else %}
      {% if item.url == thisUrl %}<li class="current">{{ item.text }}{% else %}<li><a href="{{ item.url }}">{{ item.text }}</a>{% endif %}</li>
    {% endif %}
  {% endfor %}
  </ul>

</nav>
{% endhighlight %}
  <figcaption>The multi-lingual loop</figcaption>
</figure>

In this post, I introduced a technique for creating site navigation using Jekyll data files and Liquid conditionals and loops. I then showed how I&rsquo;ve extended this approach for use in a multi-lingual site I&rsquo;m building. I hope you&rsquo;ve found this exercise helpful.
