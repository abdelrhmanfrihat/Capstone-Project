import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Tags, Plus, Edit, Trash2, X, Check, AlertTriangle, Sparkles } from "lucide-react";

type SkillType = "Technical" | "Soft Skill" | "Interest" | "Behavior Trait" | "Work Style" | "Opportunity Field" | "Company Type";
type SkillCategory = "Frontend" | "Backend" | "Data Science" | "AI / Machine Learning" | "Cybersecurity" | "UI/UX" | "General" | "Cloud" | "Mobile" | "Business" | "Marketing";
type Status = "Active" | "Draft" | "Archived";

interface Skill {
  id: number;
  name: string;
  type: SkillType;
  category: SkillCategory;
  description: string;
  aliases: string[];
  weight: number;
  trending: boolean;
  status: Status;
  usedIn: string[];
  usageCount: number;
}

export function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: 1,
      name: "React",
      type: "Technical",
      category: "Frontend",
      description: "JavaScript library for building user interfaces",
      aliases: ["ReactJS", "React.js"],
      weight: 9,
      trending: true,
      status: "Active",
      usedIn: ["Student Assessment", "Company Opportunity Requirements", "Candidate Filters"],
      usageCount: 145
    },
    {
      id: 2,
      name: "Python",
      type: "Technical",
      category: "Backend",
      description: "High-level programming language",
      aliases: ["Python3"],
      weight: 9,
      trending: true,
      status: "Active",
      usedIn: ["Student Assessment", "Company Opportunity Requirements"],
      usageCount: 132
    },
    {
      id: 3,
      name: "Communication",
      type: "Soft Skill",
      category: "General",
      description: "Ability to convey information effectively",
      aliases: [],
      weight: 7,
      trending: false,
      status: "Active",
      usedIn: ["Student Assessment", "Match Explanation"],
      usageCount: 203
    },
    {
      id: 4,
      name: "Teamwork",
      type: "Soft Skill",
      category: "General",
      description: "Ability to work collaboratively",
      aliases: ["Collaboration"],
      weight: 7,
      trending: false,
      status: "Active",
      usedIn: ["Student Assessment", "Match Explanation"],
      usageCount: 198
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [deletingSkill, setDeletingSkill] = useState<Skill | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "Technical" as SkillType,
    category: "Frontend" as SkillCategory,
    description: "",
    aliases: "",
    weight: 5,
    trending: false,
    status: "Active" as Status,
    usedIn: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const usedInOptions = [
    "Student Assessment",
    "Company Opportunity Requirements",
    "Candidate Filters",
    "Opportunity Filters",
    "Match Explanation",
    "AI Insights"
  ];

  const resetForm = () => {
    setFormData({
      name: "",
      type: "Technical",
      category: "Frontend",
      description: "",
      aliases: "",
      weight: 5,
      trending: false,
      status: "Active",
      usedIn: []
    });
    setErrors({});
    setShowDuplicateWarning(false);
  };

  const handleAddSkill = () => {
    setShowAddModal(true);
    resetForm();
  };

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      type: skill.type,
      category: skill.category,
      description: skill.description,
      aliases: skill.aliases.join(", "),
      weight: skill.weight,
      trending: skill.trending,
      status: skill.status,
      usedIn: skill.usedIn
    });
    setShowEditModal(true);
  };

  const handleDeleteSkill = (skill: Skill) => {
    setDeletingSkill(skill);
    if (skill.usageCount > 0) {
      setShowArchiveModal(true);
    } else {
      setShowDeleteModal(true);
    }
  };

  const confirmDelete = () => {
    if (deletingSkill) {
      setSkills(skills.filter(s => s.id !== deletingSkill.id));
      setShowDeleteModal(false);
      setDeletingSkill(null);
    }
  };

  const confirmArchive = () => {
    if (deletingSkill) {
      setSkills(skills.map(s => s.id === deletingSkill.id ? { ...s, status: "Archived" } : s));
      setShowArchiveModal(false);
      setDeletingSkill(null);
    }
  };

  const checkDuplicate = (name: string) => {
    const existing = skills.find(s =>
      s.name.toLowerCase() === name.toLowerCase() &&
      (!editingSkill || s.id !== editingSkill.id)
    );
    if (existing) {
      setShowDuplicateWarning(true);
      return true;
    }
    setShowDuplicateWarning(false);
    return false;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Skill name is required.";
    }
    if (!formData.type) {
      newErrors.type = "Skill type is required.";
    }
    if (!formData.category) {
      newErrors.category = "Category is required.";
    }
    if (formData.weight < 1 || formData.weight > 10) {
      newErrors.weight = "Matching weight is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveSkill = () => {
    if (!validateForm()) return;

    // Check for duplicate if not already warned and proceeding anyway
    if (!showDuplicateWarning) {
      if (checkDuplicate(formData.name)) {
        return; // Show warning, don't proceed
      }
    }

    const newSkill: Skill = {
      id: editingSkill?.id || Date.now(),
      name: formData.name,
      type: formData.type,
      category: formData.category,
      description: formData.description,
      aliases: formData.aliases.split(",").map(a => a.trim()).filter(a => a),
      weight: formData.weight,
      trending: formData.trending,
      status: formData.status,
      usedIn: formData.usedIn,
      usageCount: editingSkill?.usageCount || 0
    };

    if (editingSkill) {
      setSkills(skills.map(s => s.id === editingSkill.id ? newSkill : s));
      setShowEditModal(false);
      setEditingSkill(null);
    } else {
      setSkills([...skills, newSkill]);
      setShowAddModal(false);
      setShowSuccessModal(true);
    }
  };

  const toggleUsedIn = (option: string) => {
    if (formData.usedIn.includes(option)) {
      setFormData({ ...formData, usedIn: formData.usedIn.filter(u => u !== option) });
    } else {
      setFormData({ ...formData, usedIn: [...formData.usedIn, option] });
    }
  };

  const SkillFormModal = ({ isEdit }: { isEdit: boolean }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--bg-card)] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[var(--border-main)] p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{isEdit ? "Edit Skill" : "Add New Skill"}</h2>
            <p className="text-[var(--text-muted)] text-sm mt-1">
              Create and categorize skills used for student profiles, opportunity requirements, filtering, and match scoring.
            </p>
          </div>
          <button onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)} className="text-[var(--text-muted)] hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Skill Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Skill Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
              placeholder="Enter skill name..."
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (e.target.value.trim()) {
                  checkDuplicate(e.target.value);
                }
              }}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            {showDuplicateWarning && (
              <div className="p-3 bg-amber-50 dark:bg-yellow-500/10 border border-amber-200 dark:border-yellow-500/30 rounded-md flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-yellow-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-amber-700 dark:text-yellow-400 font-medium">
                    A similar skill already exists: {skills.find(s => s.name.toLowerCase() === formData.name.toLowerCase())?.name}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" onClick={() => setShowDuplicateWarning(false)}>
                      Continue Anyway
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Skill Type & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Skill Type</label>
              <select
                className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as SkillType })}
              >
                <option>Technical</option>
                <option>Soft Skill</option>
                <option>Interest</option>
                <option>Behavior Trait</option>
                <option>Work Style</option>
                <option>Opportunity Field</option>
                <option>Company Type</option>
              </select>
              {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as SkillCategory })}
              >
                <option>Frontend</option>
                <option>Backend</option>
                <option>Data Science</option>
                <option>AI / Machine Learning</option>
                <option>Cybersecurity</option>
                <option>UI/UX</option>
                <option>General</option>
                <option>Cloud</option>
                <option>Mobile</option>
                <option>Business</option>
                <option>Marketing</option>
              </select>
              {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] min-h-[60px]"
              placeholder="Describe what this skill represents..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Aliases */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Aliases / Related Keywords</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
              placeholder="API, REST, Backend Integration, HTTP"
              value={formData.aliases}
              onChange={(e) => setFormData({ ...formData, aliases: e.target.value })}
            />
            <p className="text-xs text-[var(--text-muted)]">Separate keywords with commas</p>
          </div>

          {/* Matching Weight */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Matching Weight: {formData.weight}</label>
            <input
              type="range"
              min="1"
              max="10"
              className="w-full"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
            />
            <p className="text-xs text-[var(--text-muted)]">
              Higher weight means this skill has stronger impact on compatibility scoring.
            </p>
            {errors.weight && <p className="text-sm text-red-500">{errors.weight}</p>}
          </div>

          {/* Trending & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.trending}
                  onChange={(e) => setFormData({ ...formData, trending: e.target.checked })}
                />
                <span className="text-sm font-medium">Mark as trending skill</span>
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Skill Status</label>
              <select
                className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Status })}
              >
                <option>Active</option>
                <option>Draft</option>
                <option>Archived</option>
              </select>
            </div>
          </div>

          {/* Used In */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Used In</label>
            <div className="space-y-2">
              {usedInOptions.map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.usedIn.includes(option)}
                    onChange={() => toggleUsedIn(option)}
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-[var(--bg-card)] border-t border-[var(--border-main)] p-6 flex gap-3 justify-end">
          <Button variant="outline" onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleSaveSkill}>
            Save as Draft
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveSkill}>
            {isEdit ? "Save Changes" : "Add Skill"}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Categories & Skills</h1>
          <p className="text-[var(--text-muted)]">Manage skill categories and individual skills.</p>
        </div>
        <Button onClick={handleAddSkill} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4" />
          Add Skill
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {skills.filter(s => s.status !== "Archived").map((skill) => (
          <Card key={skill.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold">{skill.name}</h4>
                    {skill.trending && <Sparkles className="w-4 h-4 text-yellow-500" />}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <Badge variant="outline" className="text-xs">{skill.type}</Badge>
                    <Badge variant="neutral">{skill.category}</Badge>
                  </div>
                  {skill.description && (
                    <p className="text-xs text-[var(--text-muted)] mb-2 line-clamp-2">{skill.description}</p>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="p-1" onClick={() => handleEditSkill(skill)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="p-1 text-red-600" onClick={() => handleDeleteSkill(skill)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="text-xs text-[var(--text-muted)]">
                Used by <span className="font-semibold text-blue-600">{skill.usageCount}</span> users
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Skill Modal */}
      {showAddModal && <SkillFormModal isEdit={false} />}

      {/* Edit Skill Modal */}
      {showEditModal && <SkillFormModal isEdit={true} />}

      {/* Delete Skill Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Delete Skill?</h2>
            <p className="text-[var(--text-muted)] mb-6">
              This skill will be permanently removed from the system.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete Skill
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Archive Skill Modal */}
      {showArchiveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Archive Skill?</h2>
            <p className="text-[var(--text-muted)] mb-4">
              This skill is used by <span className="font-bold text-amber-700 dark:text-yellow-600">{deletingSkill?.usageCount}</span> student profiles and opportunity requirements.
              To protect data history, it will be archived instead of deleted.
            </p>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              Archived skills remain in existing profiles but won't appear in new assessments or filters.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowArchiveModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmArchive}>
                Archive Skill
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="text-xl font-bold">Skill Added Successfully</h2>
            </div>
            <p className="text-[var(--text-muted)] mb-6">
              The skill has been added and can now be used in assessments, opportunity requirements, filters, and matching logic.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => { setShowSuccessModal(false); handleAddSkill(); }}>
                Add Another Skill
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowSuccessModal(false)}>
                Back to Skills
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
