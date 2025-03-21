import { UserEntity } from 'src/app/domain';  

  interface GitHubUser extends UserEntity {
    email: string;  // GitHub specific
  }
  
  interface GoogleUser extends UserEntity {
    given_name?: string;
    family_name?: string;
    email?: string;
    email_verified?: boolean;
  }
  
  interface FacebookUser extends UserEntity {
    given_name?: string;
    family_name?: string;
    email_verified?: boolean;
  }
  
  interface MicrosoftUser extends UserEntity {
    given_name?: string;
    family_name?: string;
    locale?: string;
    email_verified?: boolean;
  }
  
  interface TwitterUser extends UserEntity {
    // Twitter-specific properties if any
  }
  
  export type User = GitHubUser | GoogleUser | FacebookUser | MicrosoftUser | TwitterUser;