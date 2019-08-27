# @laney/react-use-fetch

> a hook that keeps track of the status of an HTTP request

[![NPM](https://img.shields.io/npm/v/@laney/react-use-fetch.svg)](https://www.npmjs.com/package/@laney/react-use-fetch) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @laney/react-use-fetch
```

## Usage

```jsx
import React, { Component } from 'react'

import { useMyHook } from '@laney/react-use-fetch'

const Example = () => {
  const example = useMyHook()
  return (
    <div>{example}</div>
  )
}
```

## License

MIT © [laneysmith](https://github.com/laneysmith)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
