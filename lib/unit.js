// 私有方法
var DOT_RE = /\/\.\//g
var DOUBLE_DOT_RE = /\/[^/]+\/\.\.\//
var DOUBLE_SLASH_RE = /([^:/])\/\//g

function realpath(path) {
    // /a/b/./c/./d ==> /a/b/c/d
    path = path.replace(DOT_RE, "/")

    // a/b/c/../../d  ==>  a/b/../d  ==>  a/d
    while (path.match(DOUBLE_DOT_RE)) {
        path = path.replace(DOUBLE_DOT_RE, "/")
    }
    // a//b/c  ==>  a/b/c
    path = path.replace(DOUBLE_SLASH_RE, "$1/")

    return path
}

exports.realpath = realpath