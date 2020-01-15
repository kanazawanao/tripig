export class User {
  uid: string;
  name: string;
  photoUrl: string;

  constructor(uid?: string, name?: string, photoUrl?: string) {
    // 変更
    this.uid = uid ? uid : '';
    this.name = name ? name : '';
    this.photoUrl = photoUrl ? photoUrl : '';
  }

  deserialize() {
    return Object.assign({}, this);
  }
}

export class Session {
  login: boolean;
  user: User;

  constructor() {
    this.login = false;
    this.user = new User();
  }

  reset(): Session {
    this.login = false;
    this.user = new User();
    return this;
  }
}
