export type User = {
  login: string;
  id: string;
  node_id?: string;
  avatar_url?: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  site_admin?: boolean;
  score?: number;
  hl_login?: string;
  hl_name?: string;
  hl_profile_bio?: string;
  followed_by_current_user?: boolean | null;
  followers?: number;
  is_current_user?: boolean;
  location?: string;
  display_login: string;
  name?: string;
  profile_bio?: string;
  sponsorable?: boolean;
  repos?: number;
}

// Type for Users Search data type
export type Users = {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
}
// Type finished!

// Interface for Repos page
export interface Owner {
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
}

export interface License {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}
// Interface finished!

// Interface of Button
export interface ButtonProps {
  text: string;
  onClick: () => void;
  hidden?: boolean;
}
// Interface finished!

// Followers Datatype
export type FollowData = {
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
}
// Type finished!

// Repository Datatype
export type RepositoryData = {
  id: number;
  node_id?: string;
  name: string;
  full_name?: string;
  private?: boolean;
  owner?: Owner;
  html_url?: string;
  description?: string;
  fork?: boolean;
  url: string;
  forks_url?: string;
  keys_url?: string;
  collaborators_url?: string;
  teams_url?: string;
  hooks_url?: string;
  issue_events_url?: string;
  events_url?: string;
  assignees_url?: string;
  branches_url?: string;
  tags_url?: string;
  blobs_url?: string;
  git_tags_url?: string;
  git_refs_url?: string;
  trees_url?: string;
  statuses_url?: string;
  languages_url?: string;
  stargazers_url?: string;
  contributors_url?: string;
  subscribers_url?: string;
  subscription_url?: string;
  commits_url?: string;
  git_commits_url?: string;
  comments_url?: string;
  issue_comment_url?: string;
  contents_url?: string;
  compare_url?: string;
  merges_url?: string;
  archive_url?: string;
  downloads_url?: string;
  issues_url?: string;
  pulls_url?: string;
  milestones_url?: string;
  notifications_url?: string;
  labels_url?: string;
  releases_url?: string;
  deployments_url?: string;
  created_at?: string;
  updated_at?: string;
  pushed_at?: string;
  git_url?: string;
  ssh_url?: string;
  clone_url?: string;
  svn_url?: string;
  homepage?: string | null;
  size?: number;
  stargazers_count?: number;
  watchers_count?: number;
  language?: string;
  has_issues?: boolean;
  has_projects?: boolean;
  has_downloads?: boolean;
  has_wiki?: boolean;
  has_pages?: boolean;
  has_discussions?: boolean;
  forks_count?: number;
  mirror_url?: string | null;
  archived?: boolean;
  disabled?: boolean;
  open_issues_count?: number;
  license?: License;
  allow_forking?: boolean;
  is_template?: boolean;
  web_commit_signoff_required?: boolean;
  topics?: string[];
  visibility?: string;
  forks?: number;
  open_issues?: number;
  watchers?: number;
  default_branch?: string;
  temp_clone_token?: string | null;
  network_count?: number;
  subscribers_count?: number;
};
// Type finished!

// Repository Content Datatype
type Link = {
  self: string;
  git: string;
  html: string;
};

export type RepositoryContent = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: string;
  _links: Link;
};
// Datatype Finished!

// Gists Datatype
type ChangeStatus = {
  total: number;
  additions: number;
  deletions: number;
};

type GistHistory = {
  user: Owner;
  version: string;
  committed_at: string;
  change_status: ChangeStatus;
  url: string;
};

export type GistFile = {
  filename: string;
  type: string;
  language: string;
  raw_url: string;
  size: number;
  truncated?: boolean;
  content?: string;
};

export type GistResponse = {
  url: string;
  forks_url: string;
  commits_url: string;
  id: string;
  node_id: string;
  git_pull_url: string;
  git_push_url: string;
  html_url: string;
  files: {
    [filename: string]: GistFile;
  };
  public: boolean;
  created_at: string;
  updated_at: string;
  description: string;
  comments: number;
  user: any | null;
  comments_url: string;
  owner: Owner;
  truncated?: boolean;
  history?: {
    [version: string]: GistHistory;
  };
};
// Datatype Finished!

// Organization Datatype
export type OrgsData = {
  login: string;
  id: number;
  node_id: string;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description: string;
};
// Type finished!

// Notification Datatype
export type NotificationData = {
  id: string;
  type: string;
  actor: User;
  repo: RepositoryData;
  payload: {
    action: string;
    number?: number;
    pull_request?: {
      url: string;
      id: number;
      node_id: string;
      html_url: string;
      diff_url: string;
      patch_url: string;
      issue_url: string;
      number: number;
      state: string;
      locked: boolean;
      title: string;
      user: Owner;
      body: string;
      created_at: string;
      updated_at: string;
      closed_at: string | null;
      merged_at: string | null;
      merge_commit_sha: string | null;
      assignee: any;
      assignees: any[];
      requested_reviewers: any[];
      requested_teams: any[];
      labels: any[];
      milestone: any;
      draft: boolean;
      commits_url: string;
      review_comments_url: string;
      review_comment_url: string;
      comments_url: string;
      statuses_url: string;
      head: {
        label: string;
        ref: string;
        sha: string;
        user: Owner;
        repo: RepositoryData;
      };
      base: {
        label: string;
        ref: string;
        sha: string;
        user: Owner;
        repo: RepositoryData;
      };
      _links: {
        self: {
          href: string;
        };
        html: {
          href: string;
        };
        issue: {
          href: string;
        };
        comments: {
          href: string;
        };
        review_comments: {
          href: string;
        };
        review_comment: {
          href: string;
        };
        commits: {
          href: string;
        };
        statuses: {
          href: string;
        };
      };
      author_association: string;
      auto_merge: any;
      active_lock_reason: any;
      merged: boolean;
      mergeable: boolean | null;
      rebaseable: boolean | null;
      mergeable_state: string;
      merged_by: any;
      comments: number;
      review_comments: number;
      maintainer_can_modify: boolean;
      commits: number;
      additions: number;
      deletions: number;
      changed_files: number;
    };
    issue?: {
      url: string;
      repository_url: string;
      labels_url: string;
      comments_url: string;
      events_url: string;
      html_url: string;
      id: number;
      node_id: string;
      number: number;
      title: string;
      user: Owner;
      labels: any[];
      state: string;
      locked: boolean;
      assignee: any;
      assignees: any[];
      milestone: any;
      comments: number;
      created_at: string;
      updated_at: string;
      closed_at: any;
      author_association: string;
      active_lock_reason: any;
      body: string;
      reactions: any;
      timeline_url: string;
      performed_via_github_app: any;
      state_reason: string;
    };
  };
  public: boolean;
  created_at: string;
};