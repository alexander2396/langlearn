using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Langlearn.DataAccess.Migrations
{
    public partial class WordCategories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Words_Languages_LanguageId",
                table: "Words");

            migrationBuilder.AddColumn<int>(
                name: "WordCategoryId",
                table: "Words",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "WordCategories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    LanguageId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WordCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WordCategories_Languages_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "Languages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Words_WordCategoryId",
                table: "Words",
                column: "WordCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_WordCategories_LanguageId",
                table: "WordCategories",
                column: "LanguageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Words_Languages_LanguageId",
                table: "Words",
                column: "LanguageId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Words_WordCategories_WordCategoryId",
                table: "Words",
                column: "WordCategoryId",
                principalTable: "WordCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Words_Languages_LanguageId",
                table: "Words");

            migrationBuilder.DropForeignKey(
                name: "FK_Words_WordCategories_WordCategoryId",
                table: "Words");

            migrationBuilder.DropTable(
                name: "WordCategories");

            migrationBuilder.DropIndex(
                name: "IX_Words_WordCategoryId",
                table: "Words");

            migrationBuilder.DropColumn(
                name: "WordCategoryId",
                table: "Words");

            migrationBuilder.AddForeignKey(
                name: "FK_Words_Languages_LanguageId",
                table: "Words",
                column: "LanguageId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
