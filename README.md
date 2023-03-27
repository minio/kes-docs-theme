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

### include

Reuse content from a folder in multiple page files.
Similar to Flare Snippets, Sphinx Includes, Antora partials, and similar content reuse mechanisms.

```
{{% include "path/to/file.md" %}}
```

Replace `path/to/file.md` with a folder and/or file path of any level under the site's `content` folder.
