using System;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class LikesController(IUnitOfWork unow) : BaseApiController
{
    [HttpPost("{targetMemberId}")]
    public async Task<ActionResult> ToggleLike(string targetMemberId)
    {
        var sourceMemberId = User.GetMemberId();
        if(sourceMemberId == targetMemberId) return BadRequest("You cannot like yourself");
        var existingLike = await unow.LikesRepository.GetMemberLike(sourceMemberId, targetMemberId);
        if(existingLike == null)
        {
            var like = new MemberLike
            {
                SourceMemberId = sourceMemberId,
                TargetMemberId = targetMemberId
            };

            unow.LikesRepository.AddLike(like);
        }
        else
        {
            unow.LikesRepository.DeleteLike(existingLike);
        }

        if(await unow.Complete()) return Ok();

        return BadRequest("Failed to update like");
    }

    [HttpGet("list")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetCurrentMemberLikeIds()
    {
        return Ok(await unow.LikesRepository.GetCurrentMemberLikeIds(User.GetMemberId()));
    }

    [HttpGet]
    public async Task<ActionResult<PaginatedResult<Member>>> GetMemberLikes(
        [FromQuery] LikesParam likesParam)
    {
        likesParam.MemberId = User.GetMemberId();
        var members = await unow.LikesRepository.GetMemberLikes(likesParam);

        return Ok(members);
    }
}
