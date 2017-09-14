import {UrlSerializer, UrlTree, DefaultUrlSerializer} from '@angular/router';

export class CustomUrlSerializer implements UrlSerializer {
    parse(url: any): UrlTree {
        let dus = new DefaultUrlSerializer();
        return dus.parse(url);
    }

    serialize(tree: UrlTree): any {
        let dus = new DefaultUrlSerializer(),
            path = dus.serialize(tree);
        // use your regex to replace as per your requirement.
        path=path.replace(/%5B/g,'[');
        path=path.replace(/%5D/g,']');
        path=path.replace(/%20/g,'_');
        path=path.replace(/\(/g,'[');
        path=path.replace(/\)/g,']');
        return path;
    }
}