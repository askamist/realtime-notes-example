export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface NoteTag {
  tag: Tag;
  noteId: string;
  tagId: string;
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  userId: string;
  teamId?: string;
  createdAt: string;
  updatedAt: string;
  tags: NoteTag[];
  sharedWith?: NoteShare[];
  team?: Team;
}

export interface TeamMember {
  id: string;
  email: string;
  role: string;
  userId: string;
}

export interface Team {
  id: string;
  name: string;
  ownerId: string;
  members: TeamMember[];
  createdAt: string;
  updatedAt: string;
}

export interface NoteShare {
  id: string;
  noteId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
