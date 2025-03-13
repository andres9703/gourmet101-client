interface SocialUser {
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    sub: string;
  }
  
  interface GitHubUser extends SocialUser {
    email: string;  // GitHub specific
  }
  
  interface GoogleUser extends SocialUser {
    given_name?: string;
    family_name?: string;
    email?: string;
    email_verified?: boolean;
  }
  
  interface FacebookUser extends SocialUser {
    given_name?: string;
    family_name?: string;
    email_verified?: boolean;
  }
  
  interface MicrosoftUser extends SocialUser {
    given_name?: string;
    family_name?: string;
    locale?: string;
    email_verified?: boolean;
  }
  
  interface TwitterUser extends SocialUser {
    // Twitter-specific properties if any
  }
  
  export type User = GitHubUser | GoogleUser | FacebookUser | MicrosoftUser | TwitterUser;