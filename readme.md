## ClearURLs for tampermonkey

https://github.com/ClearURLs/Rules


## rules

https://docs.clearurls.xyz/1.26.1/specs/rules/

```json
{
    "providers": {
        "provider name": {
            "urlPattern": "^https?://(?:[a-z0-9-]+\\.)*?domainName\\.com",
            "completeProvider": false,
            "rules": [
                "trackingField",
            ],
            "rawRules": [
                "/ref=[^/|?]*"
            ],
            "referralMarketing": [
                "tag"
            ],
            "exceptions": [
                "^https?://(?:[a-z0-9-]+\\.)*?domainName\\.com/re.*/redirector.html/"
            ],
            "redirections": [
                "^https?://(?:[a-z0-9-]+\\.)*?domainName\\.com.*url\\?.*url=([^&]+)"
            ],
            "forceRedirection": false
        }
    }
}
```

## install

### github
[clearurls.user.js](https://github.com/ahaoboy/clearurls/releases/latest/download/clearurls.user.js)


### unpkg
[clearurls.user.js](https://unpkg.com/clearurls/dist/clearurls.user.js)