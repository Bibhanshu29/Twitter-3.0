import React, { useEffect, useState } from 'react'
import { Comment, Tweet } from '../typings'
import TimeAgo from 'react-timeago'
import {
    ChatAlt2Icon,
    HeartIcon,
    SwitchHorizontalIcon,
    UploadIcon,
} from '@heroicons/react/outline'
import { fetchComments } from '../utils/fetchComments'
import { useSession } from 'next-auth/react'

interface Props{
    tweet: Tweet
}

function Tweet({ tweet }: Props) {

    const [comments, setComments] = useState<Comment[]>([])
    const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
    const { data: session } = useSession()
    const [input, setInput] = useState<string>('')
    const refreshComments = async () => {
        const comments: Comment[] = await fetchComments(tweet._id)
        setComments(comments);
    }

    useEffect(() => {
        refreshComments();
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

  return (
    <div className="flex flex-col space-x-3 border-y p-5 border-grey-100">
        <div className="flex space-x-3">
            <img src={tweet.profileImg} alt="" className="h-10 w-10 rounded-full object-cover"/>
            <div>
                <div className="flex items-center space-x-1">
                    <p className="mr-1 font-bold">{tweet.username}</p>
                    <p className="hidden text-sm text-grey-500 sm:inline">@{tweet.username.replace(/\s+/g, '').toLowerCase()} .</p>

                    <TimeAgo className="text-sm text-gray-500" date={tweet._createdAt}/>
                </div>
                <p>{tweet.text}</p>
                {tweet.image && (<img src={tweet.image} alt="" className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-xl" />)}
            </div>
        </div>
        <div className="flex justify-between mt-5">
            <div onClick={() => session && setCommentBoxVisible(!commentBoxVisible)} className="flex cursor-pointer items-center space-x-3 text-gray-400">
                {/* first */}
                <ChatAlt2Icon  className="h-5 w-5"/>
                <p>{comments.length}</p>
            </div>
            <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
                {/* second */}
                <SwitchHorizontalIcon className="h-5 w-5"/>
            </div>
            <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
                {/* third */}
                <HeartIcon className="h-5 w-5"/>
            </div>
            <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
                {/* fourth */}
                <UploadIcon className="h-5 w-5"/>
            </div>
        </div>

        {
            commentBoxVisible && (
                <form onSubmit={handleSubmit} className='mt-3 flex space-x-3'>
                    <input value={input} onClick={(e) => setInput(e.target.value)} className='flex-1 rounded-lg bg-gray-100 p-2 outline-none' type="text" placeholder='Write a comment ...'/>
                    <button type="submit" disabled={!input} className='text-twitter disabled:text-gray-200'>Post</button>
                </form>
            )
        }

        {comments?.length > 0 && (
            <div className='my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5'>
                {comments.map(comment => (
                    <div key={comment._id} className="relative flex space-x-2">
                        <hr className='absolute left-5 top-10 h-8 border-x border-twitter/30'/>
                        <img src={comment.profileImg} alt="" className='mt-2 h-7 w-7 object-cover rounded-full'/>
                        <div>
                            <div className='flex items-center space-x-1'>
                                <p className='mr-1 font-bold'>{comment.username}</p>
                                <p className='hidden text-sm text-grey-500 lg:inline'>@{comment.username.replace(/\s+/g, '').toLowerCase()}</p>
                                <TimeAgo className="text-sm text-gray-500" date={comment._createdAt}/>
                            </div>
                            <p>{comment.comment}</p>
                        </div>
                    </div>
                ))}

            </div>
            )}
    </div>
  )
}

export default Tweet