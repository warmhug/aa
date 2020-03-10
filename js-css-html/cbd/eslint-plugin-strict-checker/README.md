# eslint-plugin-strict-checker

strict checker

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-strict-checker`:

```
$ npm install eslint-plugin-strict-checker --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-strict-checker` globally.

## Usage

Add `strict-checker` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "strict-checker"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "strict-checker/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





