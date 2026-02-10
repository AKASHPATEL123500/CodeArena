import Skill from "../models/skill_model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiRespone } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// ================= CREATE SKILL =================

export const createSkill = asyncHandler(async (req, res) => {

    const { name, slug, category, difficulty, description } = req.body;

    if (!name || !slug) {
        throw new ApiError(400, "Name and slug required");
    }

    const exists = await Skill.findOne({ slug });

    if (exists) {
        throw new ApiError(400, "Skill already exists");
    }

    const skill = await Skill.create({
        name,
        slug,
        category,
        difficulty,
        description,
        isActive: true
    });

    return res
        .status(201)
        .json(new ApiRespone(201, skill, "Skill created"));
});


// ================= GET ALL =================

export const getAllSkill = asyncHandler(async (req, res) => {

    const { difficulty, category } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;   // ✅ FIXED

    const filter = { isActive: true };

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const skills = await Skill.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("name slug category difficulty icon totalUsers");

    const total = await Skill.countDocuments(filter);
    const totalPage = Math.ceil(total / limit);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                skills,
                pagination: {
                    total,
                    page,
                    totalPage,
                    limit
                }
            },
            "Skills fetched successfully"
        )
    );
});


// ================= GET BY SLUG =================

export const getSkillBySlug = asyncHandler(async (req, res) => {

    const { slug } = req.params;

    const skill = await Skill.findOne({
        slug,
        isActive: true
    }).populate("relatedSkills", "name slug icon");

    if (!skill) {
        throw new ApiError(404, "Skill not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, skill, "Skill fetched"));
});


// ================= SEARCH =================

export const searchSkills = asyncHandler(async (req, res) => {

    const { q } = req.query;

    if (!q || q.trim() === "") {
        throw new ApiError(400, "Search query is required");
    }

    const skills = await Skill.searchSkills(q.trim());

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                skills,
                count: skills.length
            },
            "Search results"
        )
    );
});
