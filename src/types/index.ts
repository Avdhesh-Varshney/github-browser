export type UserDetails = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export type User = {
  avatar_url: string;
  hl_login: string;
  hl_name: string;
  hl_profile_bio: string;
  followed_by_current_user: boolean | null;
  followers: number;
  id: string;
  is_current_user: boolean;
  location: string;
  login: string;
  display_login: string;
  name: string;
  profile_bio: string;
  sponsorable: boolean;
  repos: number;
}

export type Facet = {
}

export type Payload = {
  header_redesign_enabled?: boolean;
  results: User[];
  type: string;
  page: number;
  page_count: number;
  elapsed_millis: number;
  errors: any[];
  result_count: number;
  facets: Facet[];
  protected_org_logins: any[];
  topics?: any;
  query_id?: string;
  logged_in: boolean;
  sign_up_path?: string;
  sign_in_path?: string;
  metadata: any;
}

export type Users = {
  payload: Payload;
  title?: string;
}
