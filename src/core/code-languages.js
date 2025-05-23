import apache from 'highlight.js/lib/languages/apache'
import bash from 'highlight.js/lib/languages/bash'
import cpp from 'highlight.js/lib/languages/cpp'
import cs from 'highlight.js/lib/languages/csharp'
import css from 'highlight.js/lib/languages/css'
import diff from 'highlight.js/lib/languages/diff'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import http from 'highlight.js/lib/languages/http'
import ini from 'highlight.js/lib/languages/ini'
import go from 'highlight.js/lib/languages/go'
import less from 'highlight.js/lib/languages/less'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import makefile from 'highlight.js/lib/languages/makefile'
import markdown from 'highlight.js/lib/languages/markdown'
import nginx from 'highlight.js/lib/languages/nginx'
import objectivec from 'highlight.js/lib/languages/objectivec'
import perl from 'highlight.js/lib/languages/perl'
import php from 'highlight.js/lib/languages/php'
import plaintext from 'highlight.js/lib/languages/plaintext'
import properties from 'highlight.js/lib/languages/properties'
import python from 'highlight.js/lib/languages/python'
import ruby from 'highlight.js/lib/languages/ruby'
import scss from 'highlight.js/lib/languages/scss'
import shell from 'highlight.js/lib/languages/shell'
import sql from 'highlight.js/lib/languages/sql'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'

export default [
  {
    label: 'Auto Detection',
    value: null,
    config: null
  },
  {
    label: 'Plain Text',
    value: 'plaintext',
    config: plaintext
  },
  {
    label: 'Apache',
    value: 'apache',
    config: apache
  },
  {
    label: 'Bash',
    value: 'bash',
    config: bash
  },
  {
    label: 'C++',
    value: 'cpp',
    config: cpp
  },
  {
    label: 'C#+',
    value: 'cs',
    config: cs
  },
  {
    label: 'CSS',
    value: 'css',
    config: css
  },
  {
    label: 'Diff',
    value: 'diff',
    config: diff
  },
  {
    label: 'Dockerfile',
    value: 'dockerfile',
    config: dockerfile
  },
  {
    label: 'HTTP',
    value: 'http',
    config: http
  },
  {
    label: 'Ini, TOML',
    value: 'ini',
    config: ini
  },
  {
    label: 'Go',
    value: 'go',
    config: go
  },
  {
    label: 'Less',
    value: 'less',
    config: less
  },
  {
    label: 'Java',
    value: 'java',
    config: java
  },
  {
    label: 'JavaScript',
    value: 'javascript',
    config: javascript
  },
  {
    label: 'JSON',
    value: 'json',
    config: json
  },
  {
    label: 'Makefile',
    value: 'makefile',
    config: makefile
  },
  {
    label: 'Markdown',
    value: 'markdown',
    config: markdown
  },
  {
    label: 'Nginx',
    value: 'nginx',
    config: nginx
  },
  {
    label: 'Objective-C',
    value: 'objectivec',
    config: objectivec
  },
  {
    label: 'Perl',
    value: 'perl',
    config: perl
  },
  {
    label: 'PHP',
    value: 'php',
    config: php
  },
  {
    label: 'Properties',
    value: 'properties',
    config: properties
  },
  {
    label: 'Python',
    value: 'python',
    config: python
  },
  {
    label: 'Ruby',
    value: 'ruby',
    config: ruby
  },
  {
    label: 'SCSS',
    value: 'scss',
    config: scss
  },
  {
    label: 'Shell',
    value: 'shell',
    config: shell
  },
  {
    label: 'SQL',
    value: 'sql',
    config: sql
  },
  {
    label: 'TypeScript',
    value: 'typescript',
    config: typescript
  },
  {
    label: 'HTML, XML',
    value: 'xml',
    config: xml
  },
  {
    label: 'YAML',
    value: 'yaml',
    config: yaml
  }
]
