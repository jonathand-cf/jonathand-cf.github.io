---
layout: archive
title: "Prosjekter"
permalink: /projects/
author_profile: false
---

{% capture written_label %}'None'{% endcapture %}

{% for project in site.projects %}
  {% unless project.output == false or project.label == "posts" %}
    {% capture label %}{{ project.label }}{% endcapture %}
    {% if label != written_label %}
      <h2 id="{{ label | slugify }}" class="archive__subtitle">{{ label }}</h2>
      {% capture written_label %}{{ label }}{% endcapture %}
    {% endif %}
  {% endunless %}
  {% for post in project.docs %}
    {% unless project.output == false or project.label == "posts" %}
      {% include archive-single.html %}
    {% endunless %}
  {% endfor %}
{% endfor %}