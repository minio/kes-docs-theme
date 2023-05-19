# MinIO Hugo Docs Theme

## Usage

Follow the steps below to create a new Hugo site with the MinIO Hugo Docs theme. Make sure to install [Node.js](https://nodejs.org/en) and
[Hugo](https://gohugo.io/installation/) before running the commands.

### Create Hugo site

```bash
hugo new site [site-name]
cd [site-name]
git init
git submodule add https://github.com/miniohq/hugo-docs-theme themes/hugo-docs-theme
echo "theme = 'hugo-docs-theme'" >> config.toml
```

### Update config.toml

-   Set the `baseURL` to the URL of your site or `/`.
-   Copy `params`, `markup`, and `menu` from `hugo-docs-theme/theme.toml` to your site's `config.toml` file. This will enable the site menu, syntax highlighting
    and TOC depth.
-   Optionally, you can set the [`relativeURLs`](https://gohugo.io/content-management/urls/#relative-urls) to `True` to enable relative URLs based on your
    deployement requirements.

### Build theme assets

```bash
cd themes/hugo-docs-theme
npm install
npm run build
```

This will build the theme assets and place them inside `assets/dist` folder.

### Start the Hugo server

Run the following command at the root of your Hugo site to start the Hugo server.

```bash
hugo server
```

Now you can access the site at [http://localhost:1313](http://localhost:1313).

## Left Nav

### Heading

You can customize the text that displays at the top of the left navigation by site language. You can make the text a link and customize where the link points.

### Link Text

Define the link text in `theme/minio-hugo-docs/assets/i18n/[languageCode].yaml` at the `nav_title` entry.

### Hyperlink

Define the side nav title link in `config.toml` in the `homeLink` parameter.

```toml
[params]
    homeLink = '/'
```

## Available Shortcodes

Hugo uses shortcodes to extend what is normally available with Markdown.

### Admonitions

We have added a shortcode that supports five admonition types

-   Note
-   Tip
-   Caution
-   Warning
-   important

```Markdown
{{< admonition title="Admonition title" type="[note | tip | caution | warning | important]" >}}
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

### Tabs

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

### Cards

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

Reuse content from a folder in multiple page files. Similar to Flare Snippets, Sphinx Includes, Antora partials, and similar content reuse mechanisms.

```
{{% include "path/to/file.md" %}}
```

Replace `path/to/file.md` with a folder and/or file path of any level under the site's `content` folder.


## Custom Frontmatter params

### `navHidden`

Avoid the theme from embedding the page within the navigation.

e.g. `navHidden: true`

### `heading`

Treat the left nav link as a group heading.