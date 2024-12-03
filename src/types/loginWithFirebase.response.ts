interface ProviderData {
    providerId: string;
    uid: string;
    displayName: string | null;
    email: string;
    phoneNumber: string | null;
    photoURL: string | null;
  }
  
  interface StsTokenManager {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  }
  
  interface User {
    uid: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerData: ProviderData[];
    stsTokenManager: StsTokenManager;
    accessToken: string;
    displayName: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
  }
  
  interface TokenResponse {
    kind: string;
    localId: string;
    email: string;
    displayName: string;
    idToken: string;
    registered: boolean;
    refreshToken: string;
    expiresIn: string;
  }
  
  interface LoginResponse {
    user: User;
    providerId: string | null;
    _tokenResponse: TokenResponse;
    operationType: string;
  }
  
  // Example Response:
  const exampleResponse: LoginResponse = {
    user: {
        uid: "OcVWWE2z03Unc0MUhtr6kGAJQUz1",
        email: "maiantiem123@gmail.com",
        emailVerified: false,
        isAnonymous: false,
        providerData: [
            {
                providerId: "password",
                uid: "maiantiem123@gmail.com",
                displayName: null,
                email: "maiantiem123@gmail.com",
                phoneNumber: null,
                photoURL: null
            }
        ],
        stsTokenManager: {
            refreshToken: "",
            accessToken: "",
            expirationTime: 1733224705879
        },
        accessToken: "",
        displayName: null,
        phoneNumber: null,
        photoURL: null
    },
    providerId: null,
    _tokenResponse: {
      kind: "identitytoolkit#VerifyPasswordResponse",
      localId: "OcVWWE2z03Unc0MUhtr6kGAJQUz1",
      email: "maiantiem123@gmail.com",
      displayName: "",
      idToken: "",
      registered: true,
      refreshToken: "",
      expiresIn: "3600"
    },
    operationType: "signIn"
  };