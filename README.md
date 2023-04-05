# MinIO Hugo Docs Theme

## Config

### Left Nav Heading

You can customize the text that displays at the top of the left navigation by site language.
You can make the text a link and customize where the link points.

#### Link Text

Define the link text in `theme/minio-hugo-docs/assets/i18n/[languageCode].yaml` at the `nav_title` entry.

#### Hyperlink

Define the side nav title link in `config.toml` in the `homeLink` parameter.

```toml
[params]
    homeLink = '/'
```

## Available Shortcodes

Hugo uses shortcodes to extend what is normally available with Markdown.


### Admonitions

We have added a shortcode that supports four admonition types

- Note
- Tip
- Caution
- Warning

```Markdown
{{< admonition title="Admonition title" type="[note | tip | caution | warning]" >}}
Text...
{{< /admonition >}}
```

The admonition title (`title="Admonition title"`) is optional.

```Markdown
{{< admonition title="Warning: Data loss!" type="warning" >}}
Using this command causes data loss. 
Use with caution.
{{< /admonition >}}
```

## Tabs

Tabbed-view navigation is supported using the following shortcode.

```
{{< tabs "uniqueid" >}}
{{< tab "tab 1 title" >}} 
  tab 1 Content 
{{< /tab >}}
{{< tab "tab 2 title" >}} 
  tab 2 Content 
{{< /tab >}}
...
{{< /tabs >}}
```

## Cards

Use the following shortcode to create card. 

```
{{< cards >}}
{{< card title="Optional card title" >}}

Card content

{{< /card >}}
{{< /cards >}}

```

Multiple cards can be grouped together by repeating the `{{< card >}}` shortcode.

```
{{< cards >}}
{{< card title="Optional card 1 title" >}}

Card 1 content

{{< /card >}}

{{< card title="Optional card 2 title" >}}

Card 2 content

{{< /card >}}

{{< card title="Optional card 3 title" >}}

Card 3 content

{{< /card >}}
{{< /cards >}}

```

### include

Reuse content from a folder in multiple page files.
Similar to Flare Snippets, Sphinx Includes, Antora partials, and similar content reuse mechanisms.

```
{{% include "path/to/file.md" %}}
```

Replace `path/to/file.md` with a folder and/or file path of any level under the site's `content` folder.

