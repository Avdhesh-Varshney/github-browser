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
