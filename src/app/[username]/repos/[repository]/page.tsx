import { FetchData } from '@/utils/FetchData';
import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import { formatDate } from '@/utils/Functions';
import { Repository } from '@/types';
import Link from 'next/link';
import React from 'react'
import { FaStar } from 'react-icons/fa';
import CopyCard from '../components/CopyCard';

const exploreRepository = async ({ params }: { params: { username: string, repository: string } }) => {
  const url = `${process.env.REPO_URL}/${params.username}/${params.repository}`;
  const repo: Repository = await FetchData(url);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="my-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Bar */}
        <div className="flex flex-col gap-4">
          <div className='md:col-span-1 flex flex-col items-center border p-3 rounded-lg bg-white'>
            <h2 className="text-3xl font-bold text-gray-800 mb-2 border-b-2 border-blue-500 inline-block">{repo.name}</h2>
            {repo.description && <p className="text-gray-600 mb-4"><strong>Description:</strong> {repo.description}</p>}
          </div>

          {params.username === repo.name && (
            <span title="Introductory Repository" className="absolute top-4 right-4 text-yellow-400">
              <FaStar size={24} />
            </span>
          )}
          <div className='grid grid-cols-2 gap-1'>
            <Link href={repo.html_url} passHref>
              <span className="flex flex-col items-center p-3 rounded-lg border transition-transform transform hover:scale-105">
                Repository Link
              </span>
            </Link>
            <Link href={repo.html_url}>
              <span className="flex flex-col items-center p-3 rounded-lg border transition-transform transform hover:scale-105">
                Explore Repository
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-1">
            <CopyCard value={repo.git_url} name="Copy Git URL" />
            <CopyCard value={repo.ssh_url} name="Copy SSH URL" />
            <CopyCard value={repo.svn_url} name="Copy SVN URL" />
            <CopyCard value={repo.clone_url} name="Copy Cloning URL" />
          </div>
        </div>

        {/* Right Bar */}
        <div className="md:col-span-2">
          <div className="rounded-lg shadow flex flex-col gap-4">

            {/* Repository Details */}
            <div className='bg-[#222325] p-6 rounded-lg shadow-md'>
              <h3 className="text-2xl font-semibold text-white border-b-2 border-blue-500 pb-2 mb-4">Repository Details</h3>
              <div className="space-y-2 space-x-2">
                <Card params={['Created On', formatDate(repo.created_at), null, false]} />
                <Card params={['Updated On', formatDate(repo.updated_at), null, false]} />
                <Card params={['Pushed On', formatDate(repo.pushed_at), null, false]} />

                {repo.homepage && <Card params={['', 'Deployed Link', repo.homepage, false]} />}
                <Card params={['Repo Size (in MB)', Math.round(repo.size / 1024), null, false]} />
                {repo.language && <Card params={['Most Used Language', repo.language, null, false]} />}


                <Card params={['Default Branch', repo.default_branch, null, false]} />
                <Card params={['Having Projects', repo.has_projects ? 'Yes' : 'No', null, false]} />
                <Card params={['Downloadable', repo.has_downloads ? 'Yes' : 'No', null, false]} />
                <Card params={['Having Wikis', repo.has_wiki ? 'Yes' : 'No', null, false]} />
                <Card params={['Having Pages', repo.has_pages ? 'Yes' : 'No', null, false]} />
                <Card params={['Having Discussions', repo.has_discussions ? 'Yes' : 'No', null, false]} />

                {repo.license && <Card params={['Having Licence', repo.license?.name, null, false]} />}
                <Card params={['Is it a template?', repo.is_template ? 'Yes' : 'No', null, false]} />
              </div>
            </div>

            {/* Exploring Details */}
            <div className='bg-[#222325] p-6 rounded-lg shadow-md'>
              <h3 className="text-2xl font-semibold text-white border-b-2 border-blue-500 pb-2 mb-4">Exploring Details</h3>

              <div className="space-x-2 space-y-2">
                {repo.allow_forking && <Card params={['No. of Forks', repo.forks_count, `https://api.github.com/repos/${params.username}/${params.repository}/forks`, true]} />}
                {(repo.stargazers_count > 0) && <Card params={['Stars Earned', repo.stargazers_count, `https://api.github.com/repos/${params.username}/${params.repository}/stars`, true]} />}

                {repo.has_issues && <Card params={['Issues Opened', repo.open_issues_count, `${params.repository}/issues`, false]} />}
                <Card params={['', 'Repository Events', repo.events_url, false]} />
                <Card params={['', 'Tags present in Repo', repo.tags_url, true]} />
                <Card params={['', 'Tech Stack of Repo', repo.languages_url, true]} />
                <Card params={['', 'Contributors', repo.contributors_url, true]} />

                <Card params={['Collaborated By', 'Collaborated By', repo.assignees_url, true]} />
                <Card params={['Branches', 'Branches', repo.branches_url, true]} />
                <Card params={['Commits', 'Commits', repo.git_refs_url, true]} />
                <Card params={['Subscribers', 'Subscribers', repo.subscribers_url, true]} />
                <Card params={['Commit History', 'Commit History', repo.commits_url, true]} />
                <Card params={['Comments', 'Comments', repo.comments_url, true]} />
                <Card params={['Issue Comments', 'Issue Comments', repo.issue_comment_url, true]} />
                <Card params={['Contents', 'Contents', repo.contents_url, true]} />
                <Card params={['Open Issues', 'Open Issues', repo.issues_url, true]} />
                <Card params={['Open PRs', 'Open PRs', repo.pulls_url, true]} />
                <Card params={['Milestones', 'Milestones', repo.milestones_url, true]} />
                <Card params={['Labels', 'Labels', repo.labels_url, true]} />
                <Card params={['Releases', 'Releases', repo.releases_url, true]} />
                <Card params={['Deployments', 'Deployments', repo.deployments_url, true]} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default exploreRepository
