package com.project.app.backend.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SongDto {

    @NotBlank(message = "El artista no puede estar vacío")
    @Size(min = 2, max = 50, message = "El artista debe tener entre 2 y 50 caracteres")
    @Pattern(
        regexp = "^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑüÜ&.,'-]+$",
        message = "El nombre del artista contiene caracteres no permitidos"
    )
    private String artist;

    @NotBlank(message = "El nombre de la canción no puede estar vacío")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    @Pattern(
        regexp = "^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑüÜ&.,'()-]+$",
        message = "El nombre de la canción contiene caracteres no permitidos"
    )
    private String name;

    @NotNull(message = "La duración no puede ser nula")
    @DecimalMin(value = "0.1", message = "La duración debe ser mayor a 0")
    @DecimalMax(value = "30.0", message = "La duración no puede exceder los 30 minutos")
    private Double duration;
}